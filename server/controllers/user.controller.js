const User = require("../models/User.js")
const Conversation = require("../models/Conversation.js")
const Group = require("../models/Groups.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = {

    register: async (req, res, next) => {
        const { username, email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt())
        const token = jwt.sign({ username, email, hashedPassword }, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: "5s" })
        const activationToken = await bcrypt.hash(token, await bcrypt.genSalt())

        await User.create({ username, email, password: hashedPassword, activationToken }).then(newUserData => {

            //if (newUserData) return res.status(201).json({ newUserData })

            next()
        })

    },


    activateAccount: async (req, res) => {

    },

    login: async (req, res) => {
        const userData = res.locals.userData
        const password = req.body.password

        if (await bcrypt.compare(password, userData.password)) {
            //convert user object whose coming from mongoose to json
            const userToJSON = userData.toJSON()

            //create access and refresh token
            const accessToken = jwt.sign({ id: userToJSON._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20m" })
            const refreshToken = jwt.sign({ id: userToJSON._id }, process.env.REFRESH_TOKEN_SECRET)

            res.cookie("accessToken", accessToken, {
                httpOnly: true
            })

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
            })


            // await for all the promises to fullfill then send logged user data among with his friends, groups
            // and last message sent to the respective conversation so we can display it without fetching all the messages
            const getFriends = await User.find({ _id: userData.friendList })
                .select({ "socketID": 1, "username": 1, "profilePicId": 1 })

            const friendRequests = await User.find({ _id: userData.friendRequests }).select({ "username": 1, "profilePicId": 1 })

            const getGroups = await Group.find({ $or: [{ founder: userData._id }, { moderators: userData._id }, { members: userData._id }] }, { messages: { $slice: - 1 } })

            const getConversations = await Conversation.find({ members: userData._id }, { messages: { $slice: -1 } })


            Promise.all(getFriends).then(async friendsData => {

                Promise.all(getGroups).then(async groupsData => {

                    Promise.all(friendRequests).then(async requestsData => {

                        Promise.all(getConversations).then(convData => {

                            userToJSON.friendList = friendsData

                            res.json({ isLogged: true, isValid: true, userData: userToJSON, requestsData, groupList: groupsData, convData })

                        })

                    })

                })

            }).catch(err => console.error(err.message))


        } else {
            res.json({ isLogged: false, isValid: false })
        }
    },

    update: async (req, res) => {
        const newProPicId = req.body.newProPicUrl.split("/")[3]
        const id = req.body._id

        if (newProPicId) {
            await User.findByIdAndUpdate(id, {
                profilePicId: newProPicId
            }, { new: true }).then((data) => {

                res.json({ username: data.username, profilePicId: data.profilePicId })
            }).catch(err => console.error(err.message))

        } else return

    },

    logout: async (req, res) => {

        //clear tokens on logout
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")
        res.end()
    }
}