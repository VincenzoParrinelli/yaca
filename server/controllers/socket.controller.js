const User = require("../models/User.js")
const Conversation = require("../models/Conversation.js")
const { validateSocketToken } = require("../validators/tokenSocketValidators.js")
const { registerOnlineUsers } = require("../helpers/registerOnlineUsers.js")

module.exports = io => {

    //validate socket, if not valid return an error
    io.use((socket, next) => {
        validateSocketToken(socket, next)
    })

    //when a user connects to our app we store their socket id into the database
    io.use((socket, next) => {
        registerOnlineUsers(socket, next)
    })

    const fieldsToExclude = { createdAt: 0, password: 0 }

    io.on("connection", socket => {

        socket.on("search-user", async payload => {

            const { userID, username } = payload

            if (!username) return

            //search for users matching username value and exclude current user
            await User.find({ username: { "$regex": username, "$options": "i" }, _id: { "$ne": userID } })
                .select({ "email": 1, "username": 1, "profilePicId": 1 })
                .then(usersData => {

                    socket.emit("receive-searched-users", usersData)

                }).catch(err => new Error(err))
        })

        socket.on("send-friend-request", async usersID => {

            const { currentUserId, userToAddId } = usersID

            await User.findByIdAndUpdate(userToAddId, { friendRequests: currentUserId }).then(async userToAddData => {

                await User.findByIdAndUpdate(currentUserId, { friendRequestsPending: userToAddId })
                    .select(fieldsToExclude)
                    .then(currentUserData => {

                        socket.to(currentUserData.socketID).emit("receive-pending-friend-request", userToAddId)

                        socket.to(userToAddData.socketID).emit("receive-friend-request", currentUserData)

                    }).catch(err => new Error(err.message))

            }).catch(err => new Error(err.message))
        })

        socket.on("accept-friend-request", async usersID => {

            const { currentUserID, userToAcceptID } = usersID

            await User.findByIdAndUpdate(currentUserID, { $push: { friendList: [userToAcceptID], $pull: { friendRequests: [userToAcceptID], friendRequestsPending: [userToAcceptID] } } })
                .select(fieldsToExclude)
                .then(async currentUserData => {

                    await User.findByIdAndUpdate(userToAcceptID, { $push: { friendList: [currentUserID], $pull: { friendRequestsPending: [currentUserID] } } })
                        .select(fieldsToExclude)
                        .then(userToAcceptData => {

                            socket.to(currentUserData.socketID).emit("accept-friend-request", userToAcceptData)

                            socket.to(userToAcceptData.socketID).emit("accept-friend-request", currentUserData)

                        }).catch(err => new Error(err.message))

                }).catch(err => new Error(err.message))


        })

        socket.on("refuse-friend-request", async usersID => {

            const { currentUserID, userToRefuseID } = usersID

            await User.findByIdAndUpdate(currentUserID,

                { $pull: { friendRequests: userToRefuseID } }

            ).select(fieldsToExclude).then(async currentUserData => {

                await User.findByIdAndUpdate(
                    userToRefuseID,
                    { $pull: { friendRequestsPending: currentUserID } }

                ).select(fieldsToExclude).then(userToRefuseData => {

                    socket.to(currentUserData.socketID).emit("delete-friend-request", userToRefuseData)

                    socket.to(userToRefuseData.socketID).emit("delete-friend-request", currentUserData)

                }).catch(err => new Error(err.message))


            }).catch(err => new Error(err.message))

        })

        socket.on("send-message", async payload => {

            const { currentUserID, selectedUserID, selectedUserSocketID, message } = payload

            await Conversation.findOneAndUpdate(

                { members: { $in: [currentUserID, selectedUserID] } },
                { $push: { messages: { senderID: currentUserID, text: message } } },
                { new: true }

            ).then(conversation => {

                const newMessage = conversation.messages[conversation.messages.length - 1]

                const payload = {
                    conversationID: conversation._id,
                    newMessage
                }

                socket.to(selectedUserSocketID).emit("get-message", payload)

            }).catch(err => new Error(err.message))

        })

        socket.on("disconnect", async () => {

            await User.findOneAndUpdate({ socketID: socket.id }, { socketID: "OFFLINE" }, { new: true }).then(async userData => {

                await User.find({ _id: userData.friendList }).then(friendsData => {

                    friendsData.forEach(friend => {

                        const { _id } = userData
                        const friendSocketID = friend.socketID

                        if (friendSocketID === "OFFLINE") return

                        const payload = {
                            _id,
                            socketID: "OFFLINE"
                        }

                        socket.to(friendSocketID).emit("update-friend-status", payload)

                    })


                }).catch(err => new Error(err.message))

            }).catch(err => new Error(err.message))

        })
    })

}

