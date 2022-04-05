const mongoose = require("mongoose")
const User = require("../models/User.js")
var stringSimilarity = require("string-similarity")
const { validateSocketToken } = require("../validators/tokenSocketValidators.js")

module.exports = io => {

    io.use((socket, next) => {
        validateSocketToken(socket, next)
    })

    io.on("connection", socket => {
        console.log(socket.id)

        socket.on("search-users", username => {
            console.log(username)

            User.find({ username: { "$regex": username, "$options": "i" } }).select(
                { "email": 1, "username": 1, "profilePicId": 1 }
            ).then(data => {
                socket.emit("users-list", data)
            }).catch(err => new Error(err))
        })
    })

}

