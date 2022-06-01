const User = require("../models/User.js")
const Conversation = require("../models/Conversation.js")
const Group = require("../models/Groups.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = {
    createUser: async (req, res, next) => {
        var email = req.body.email

        await User.create({ email }).then(async data => {

            next()

        }).catch(err => console.error(err.message))

    },


    activateAccount: async (req, res) => {
        var id = req.body.id
        var username = req.body.username
        var password = req.body.password

        await User.findById(id).then(async data => {
            if (data) {

                if (data.password === "NOT SET" || data.username === "NOT SET") {
                    try {
                        const hashedPassword = await bcrypt.hash(password, 10)

                        await User.findByIdAndUpdate(id, {

                            password: hashedPassword, username, $unset: { createdAt: 1 }

                        }).then(() => {

                            res.json({ isValid: true, isMatch: true, payload: data, hashedPassword })

                        }).catch(err => console.error(err.message))

                    } catch {
                        res.status(500).send(err.message)
                    }

                } else {
                    res.json({ isValid: true, isPresent: true, isMatch: true })
                }
            } else {
                res.json({ isValid: true, isPresent: false })
            }

        }).catch(err => console.error(err.message))
    },

    login: async (req, res) => {
        var userData = res.locals.data
        var password = req.body.password

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

            const getGroups = await Group.find({ members: [userData._id] }, { messages: { $slice: - 1 } })


            /*const getConversations = await Conversation.aggregate([
                { $match: { $expr: { members: userData._id } } },
                { $project: { members: 1, messages: { $slice: ["$messages", -1] } } },
                { $project: { messages: { senderID: 0 }, __v: 0 } },
            ])*/

            const getConversations = await Conversation.find({ members: userData._id }, { messages: { $slice: -1 } })


            Promise.all(getFriends).then(async friendsData => {

                Promise.all(getGroups).then(async groupsData => {

                    Promise.all(getConversations).then(convData => {

                        userToJSON.friendList = friendsData

                        res.json({ isLogged: true, isValid: true, userData: userToJSON, groupList: groupsData, convData })

                    })

                })

            }).catch(err => console.error(err.message))


        } else {
            res.json({ isLogged: false, isValid: false })
        }
    },

    update: async (req, res) => {
        var newProPicId = req.body.newProPicUrl.split("/")[3]
        var id = req.body._id

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