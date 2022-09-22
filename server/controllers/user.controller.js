const User = require("../models/User.js")
const Conversation = require("../models/Conversation.js")
const Group = require("../models/Groups.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { getObjectUrl } = require("../helpers/awsHelpers")

module.exports = {

    register: async (req, res, next) => {
        const { username, email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt())

        await User.create({ username, email, password: hashedPassword }).then(async newUserData => {

            if (newUserData) res.locals.newUserData = newUserData

            const activationToken = jwt.sign({ _id: newUserData._id }, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: "1h" })

            newUserData.activationToken = activationToken

            await newUserData.save().then(newData => {

                if (newData) next()

            })

        })

    },


    activateAccount: async (req, res, next) => {
        const { token } = req.body

        jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET, async (err, tokenData) => {
            if (err) res.sendStatus(403)

            await User.findByIdAndUpdate(tokenData._id, { verified: true, $unset: { createdAt: 1, activationToken: 1 } }, { new: true }).then(userData => {

                res.locals.userData = userData

                next()

            })
        })
    },

    login: async (req, res) => {
        const userData = res.locals.userData
        const password = req.body.password

        if (!await bcrypt.compare(password, userData.password)) return res.status(401).send({ passwordErrors: { isInvalid: true } })

        //create access and refresh token
        const accessToken = jwt.sign({ id: userData._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20m" })
        const refreshToken = jwt.sign({ id: userData._id }, process.env.REFRESH_TOKEN_SECRET)

        res.cookie("accessToken", accessToken, {
            httpOnly: true
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
        })


        // await for all the promises to fullfill then send logged user data among with his friends, groups
        // and last message sent to the respective conversation so we can display it without fetching all the messages
        const getFriends = await User.find({ _id: userData.friendList })
            .select({ "socketID": 1, "username": 1, "profilePicId": 1 }).lean()

        const friendRequests = await User.find({ _id: userData.friendRequests }).select({ "username": 1, "profilePicId": 1 }).lean()

        const getGroups = await Group.find({ $or: [{ founder: userData._id }, { moderators: userData._id }, { members: userData._id }] }, { messages: { $slice: - 1 } }).lean()

        const getConversations = await Conversation.find({ members: userData._id }, { messages: { $slice: -1 } }).lean()


        Promise.all(getFriends).then(async friendsData => {

            //download proPics from aws s3
            const friendsProPics = getFriends.map(async friend => {

                if (!friend.profilePicId) return friend

                const getObjectUrlParams = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: friend.profilePicId,
                    Expires: 60
                }

                return await getObjectUrl(getObjectUrlParams).then(proPicBlob => {

                    const newList = { ...friend, proPicBlob }

                    return newList

                })
            })


            Promise.all(friendsProPics).then(updatedFriendsWithPicsData => {

                Promise.all(getGroups).then(groupsData => {

                    Promise.all(friendRequests).then(requestsData => {

                        Promise.all(getConversations).then(convData => {

                            userData.friendList = updatedFriendsWithPicsData

                            console.log(userData.friendList)

                            res.json({
                                isLogged: true,
                                isValid: true,
                                userData,
                                requestsData,
                                groupList: groupsData,
                                convData
                            })

                        })

                    })

                })
            })

        }).catch(err => console.error(err.message))



    },

    logout: async (req, res) => {

        //clear tokens on logout
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")
        res.end()
    }
}