const mongoose = require("mongoose")
const User = require("../models/User.js")
var stringSimilarity = require("string-similarity")
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

    io.on("connection", socket => {
        console.log(socket.id)

        socket.on("send-friend-request", async usersID => {
            const { currentUserId, userToAddId } = usersID

            await User.findByIdAndUpdate(userToAddId, { friendRequests: currentUserId }).then(async userToAddData => {

                await User.findById(currentUserId).then(currentUserData => {

                    io.to(userToAddData.socketID).emit("receive-friend-request", currentUserData)

                }).catch(err => new Error(err.message))

            }).catch(err => new Error(err.message))
        })

        socket.on("accept-friend-request", async usersID => {
            const { currentUserID, userToAcceptID } = usersID

            await User.findByIdAndUpdate(currentUserID, { friendList: userToAcceptID }).then(() => {

            }).catch(err => new Error(err.message))

            await User.findByIdAndUpdate(userToAcceptID, { friendList: currentUserID }).then(() => {

            }).catch(err => new Error(err.message))
        })

        socket.on("refuse-friend-request", async usersID => {
            const { currentUserID, userToRefuseID } = usersID

            await User.findByIdAndUpdate(currentUserID, { $pull: { friendRequests: userToRefuseID } }).then(currentUserData => {

                io.to(currentUserData.socketID).emit("delete-friend-request", userToRefuseID)

            }).catch(err => new Error(err.message))

        })

        socket.on("disconnect", async () => {
            await User.findOneAndUpdate(socket.id, { socketID: "OFFLINE" }).catch(err => new Error(err.message))
        })
    })

}

