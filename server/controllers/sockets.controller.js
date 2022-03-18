const mongoose = require("mongoose")
const User = require("../models/User.js")
const { validateSocketToken } = require("../validators/tokenSocketValidators.js")

module.exports = {

    start: io => {

        io.use((socket, next) => {
            validateSocketToken(socket, next)
            next()
        }).on("connection", socket => {
            
            socket.on("get-searched-users", username => {
                console.log(username)
            })
        })
    }
}

