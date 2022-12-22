const User = require("../models/User.js")
const Group = require("../models/Groups.js")

const subscribeToGroups = async (socket, next) => {

    const currentUserID = socket.handshake.auth.currentUserID

    await Group.find({ currentUserID }).lean().select({ "_id": 1 }).then(groupData => {

        // Subscribe user to his groups
        groupData.map(group => socket.join(group._id.toJSON()))

        next()
        
    }).catch(err => err && next(new Error("401")))

}

module.exports = { subscribeToGroups }