const User = require("../../models/User.js")
const Group = require("../../models/Groups.js")

module.exports = (group, io) => {

    group.on("send-group-invite", async payload => {

        const { socketID, groupID } = payload

        await User.findById()
    })

    group.on("update-group-settings", async payload => {

        const { userID, selectedGroupID, newSettings } = payload

        //modify key names to resemble db group model key names
        Object.keys(newSettings).forEach(setting => {

            const keyWithoutNewText = setting.split("new")[1]

            const newKeyName = keyWithoutNewText.charAt(0).toLowerCase() + keyWithoutNewText.slice(1)

            delete Object.assign(newSettings, { [newKeyName]: newSettings[setting] })[setting]

        })

        await Group.findById(selectedGroupID).then(async data => {

            const { founder } = data

            if (userID !== founder) return

            //overwrite modified data
            Object.assign(data, newSettings)

            await data.save().then(updatedGroupData => {

                const idToJSON = updatedGroupData._id.toJSON()

                io.in(idToJSON).emit("send-updated-group-settings", updatedGroupData)

            }).catch(err => new Error(err.message))

        }).catch(err => new Error(err.message))

    })


    group.on("delete-group", async payload => {

        const { userID, groupID } = payload

        await Group.findById(groupID).then(async data => {

            if (data.founder !== userID) return

            await data.remove().then(() => {

                const idToJSON = data._id.toJSON()

                io.in(idToJSON).emit("delete-group-successful", groupID)
                
            }).catch(err => new Error(err.message))

        }).catch(err => new Error(err.message))

    })


}