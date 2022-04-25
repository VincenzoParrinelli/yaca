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

        socket.on("send-friend-request", async userId => {
            const { currentUserId, userToAddId } = userId

            await User.findByIdAndUpdate(userToAddId, { friendRequests: currentUserId }).then(user => {

                io.to(user.socketID).emit("receive-friend-request", user)

            }).catch(err => new Error(err.message))
        })

        socket.on("disconnect", async () => {
            await User.findOneAndUpdate(socket.id, { socketID: "OFFLINE" }).catch(err => new Error(err.message))
        })
    })

}

