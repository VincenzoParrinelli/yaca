const User = require("../models/User.js")
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

        socket.on("search-user", async username => {

            if (!username) return

            await User.find({ username: { "$regex": username, "$options": "i" } })
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

                        io.to(currentUserData.socketID).emit("receive-pending-friend-request", userToAddId)

                        io.to(userToAddData.socketID).emit("receive-friend-request", currentUserData)

                    }).catch(err => new Error(err.message))

            }).catch(err => new Error(err.message))
        })

        socket.on("accept-friend-request", async usersID => {
            const { currentUserID, userToAcceptID } = usersID

            await User.findByIdAndUpdate(currentUserID, { friendList: userToAcceptID, $pull: { friendRequests: userToAcceptID, friendRequestsPending: userToAcceptID } })
                .select(fieldsToExclude)
                .then(async currentUserData => {

                    await User.findByIdAndUpdate(userToAcceptID, { friendList: currentUserID })
                        .select(fieldsToExclude)
                        .then(userToAcceptData => {

                            io.to(currentUserData.socketID).emit("accept-friend-request", userToAcceptData)

                            io.to(userToAcceptData.socketID).emit("accept-friend-request", currentUserData)

                        }).catch(err => new Error(err.message))

                }).catch(err => new Error(err.message))


        })

        socket.on("refuse-friend-request", async usersID => {
            const { currentUserID, userToRefuseID } = usersID

            await User.findByIdAndUpdate(currentUserID, { $pull: { friendRequests: userToRefuseID } })
                .select(fieldsToExclude)
                .then(async currentUserData => {

                    await User.findByIdAndUpdate(userToRefuseID, { $pull: { friendRequestsPending: currentUserID } })
                        .select(fieldsToExclude)
                        .then(userToRefuseData => {

                            io.to(currentUserData.socketID).emit("delete-friend-request", userToRefuseData)

                            io.to(userToRefuseData.socketID).emit("delete-friend-request", currentUserData)

                        }).catch(err => new Error(err.message))


                }).catch(err => new Error(err.message))

        })

        socket.on("disconnect", async () => {

            await User.findOneAndUpdate({ socketID: socket.id }, { socketID: "OFFLINE" }).catch(err => new Error(err.message))

        })
    })

}

