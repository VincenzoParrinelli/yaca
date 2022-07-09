const User = require("../../models/User.js")
const Group = require("../../models/Groups.js")

module.exports = group => {

    group.on("send-group-invite", async payload => {

        const { socketID, groupID } = payload

        await User.findById()
    })

    group.on("update-group-settings", async payload => {

        const { userID, selectedGroupID, newSettings } = payload

        //modify key names to resemble db group model keys
        const groupModelkeyNames = Object.keys(newSettings).map(setting => {

            const keyWithoutNew = setting.split("new")[1]

            return keyWithoutNew.charAt(0).toLowerCase() + keyWithoutNew.slice(1)

        })

        await Group.findById(selectedGroupID).then(data => {

            if (userID !== data.founder) return



        }).catch(err => new Error(err.message))

    })


}