const User = require("../models/User.js")
const Group = require("../models/Groups.js")

const subscribeToGroups = async (socket, next) => {

    const currentUserID = socket.handshake.auth.currentUserID

    await Group.find({ currentUserID }).lean().then(data => {

        const groupIDS = data.map(group => group._id.toJSON())

        // subscribe user to his groups
        socket.join(groupIDS)

        next()
    }).catch(err => err && next(new Error("401")))

}

module.exports = { subscribeToGroups }