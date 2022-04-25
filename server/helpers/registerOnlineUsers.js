const User = require("../models/User.js")

const registerOnlineUsers = async (socket, next) => {

    var currentUserID = socket.handshake.auth.currentUserID

    if (!currentUserID) next(new Error("401"))

    User.findByIdAndUpdate(currentUserID, { socketID: socket.id }).then(() => {
        next()
    }).catch(err => err && next(new Error("401")))
}

module.exports = { registerOnlineUsers }