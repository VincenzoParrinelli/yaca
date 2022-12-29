const User = require("../models/User.js")
const Conversation = require("../models/Conversation.js")
const Group = require("../models/Groups.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { auth } = require("firebase-admin")

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

            await User.findByIdAndUpdate(tokenData._id, { verified: true, $unset: { createdAt: 1, activationToken: 1 } }, { new: true }).then(async userData => {

                const { email, password } = userData

                await auth().createUser({ email, password }).then(() => {

                    res.locals.userData = userData

                    next()

                }).catch(err => console.error(err.message))

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

        await auth().createCustomToken(userData._id.toString()).then(async firebaseToken => {

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true
            })

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true
            })

            res.cookie("firebaseToken", firebaseToken, {
                secure: true
            })

            //*************USE POPULATE TO FIX THIS CODE SCOPE 

            // await for all the promises to fullfill then send logged user data among with his friends, groups
            // and last message sent to the respective conversation so we can display it without fetching all the messages
            const friendsData = await User.find({ _id: userData.friendList })
                .select({ "socketID": 1, "username": 1, "profilePicID": 1 }).lean()

            const friendRequestsData = await User.find({ _id: userData.friendRequests }).select({ "username": 1, "profilePicID": 1 }).lean()

            //*************USE POPULATE TO FIX THIS CODE SCOPE 

            // Get user to user conversations
            const getConversations = await Conversation.find({ members: userData._id }, { messages: { $slice: -1 } })
                .populate({ path: 'members', select: '+ email profilePicID socketID username' }).lean() || []


            //******DO I REALLY NEED TO POPULATE AGAIN??? */ 
            await Group.find({ "members.userData": userData._id }).populate("members.userData").then(async groupsData => {

                // Get all group ids
                const groupIDS = groupsData.map(group => group._id)

                await Conversation.find({ groupID: groupIDS }).lean().then(conversationData => {

                    res.json({
                        isLogged: true,
                        isValid: true,
                        userData,
                        friendRequestsData,
                        friendList: friendsData,
                        groupList: groupsData,
                        convData: getConversations,
                        groupConvData: conversationData
                    })

                })

            })

        }).catch(err => console.error(err.message))
    },

    changeUsername: async (req, res) => {

        const { _id, newUsername, password } = req.body

        await User.findById(_id).then(async userData => {

            if (await bcrypt.compare(password, userData.password)) {

                userData.username = newUsername

                await userData.update(_id).then(() => {

                    return res.sendStatus(204)

                }).catch(err => console.error(err.message))
            }

        }).catch(err => console.error(err.message))
    },


    searchUsers: async (req, res) => {

        const { userID, usernameToSearch } = req.body

        if (!usernameToSearch) return

        //search for users matching username value and exclude current user
        await User.find({ username: { "$regex": usernameToSearch, "$options": "i" }, _id: { "$ne": userID } })
            .limit(40)
            .select({ "email": 1, "username": 1, "profilePicID": 1 })
            .then(usersData => {

                res.json(usersData)

            }).catch(err => new Error(err))

    },


    logout: async (req, res) => {

        //clear tokens on logout
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")
        res.clearCookie("firebaseToken")
        res.end()
    }
}