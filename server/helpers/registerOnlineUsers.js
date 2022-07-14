const User = require("../models/User.js")

const registerOnlineUsers = async (socket, next) => {

    const currentUserID = socket.handshake.auth.currentUserID

    if (!currentUserID) next(new Error("401"))

    await User.findByIdAndUpdate(currentUserID, { socketID: socket.id }, { new: true }).then(async userData => {

        //***************MAY NOT WORK IF USER HAS MULTIPLE FRIENDS*/
        await User.find({ _id: userData.friendList }).then(friendsData => {

            friendsData.forEach(friend => {
             
                const { _id, socketID } = userData
                const friendSocketID = friend.socketID

                if (socketID === "OFFLINE") return

                const payload = {
                    _id,
                    socketID
                }

                socket.to(friendSocketID).emit("update-friend-status", payload)
            })

        }).catch(err => err && next(new Error("401")))

        next()
    }).catch(err => err && next(new Error("401")))
}

module.exports = { registerOnlineUsers }