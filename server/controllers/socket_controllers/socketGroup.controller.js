const User = require("../../models/User.js")

module.exports = group => {

    group.on("send-group-invite", async payload => {

        const { socketID, groupID } = payload

        await User.findById()
    })


}