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

    })

}

