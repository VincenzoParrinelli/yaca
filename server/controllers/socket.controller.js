const User = require("../models/User.js")
const { validateSocketToken } = require("../validators/tokenSocketValidators.js")
const { registerOnlineUsers } = require("../helpers/registerOnlineUsers.js")
const { subscribeToGroups } = require("../helpers/subscribeToGroups.js")

module.exports = io => {

    // validate socket, if not valid return an error
    io.use((socket, next) => {
        validateSocketToken(socket, next)
    })

    // when a user connects to our app, store his socket id into the database
    io.use((socket, next) => {
        registerOnlineUsers(socket, next)
    })

    // when a user connects to our app, subscribe to all his groups
    io.use((socket, next) => {
        subscribeToGroups(socket, next)
    })


    io.on("connection", socket => {

        // initialize controllers on user connection
        require("./socket_controllers/socketUser.controller")(socket, io)
        require("./socket_controllers/socketConversation.controller")(socket, io)
        require("./socket_controllers/socketGroup.controller")(socket, io)

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

