const Group = require("../models/Groups.js")

module.exports = {
    createGroup: async (req, res) => {

        const { groupName, groupPicID, userID } = req.body

        await Group.create({ groupName, groupPicID, members: [{ userData: userID, role: ["admin"] }] }).then(group => {

            res.json(group)

        }).catch(err => console.error(err.message))

    },


    getAllGroupMessages: async (req, res) => {

        const { groupID } = req.params

        await Group.findById(groupID).populate("members.userData").lean().then(group => {

            res.json(group)

        }).catch(err => console.error(err.message))

    },

    sendGroupMessage: async (req, res) => {

        const { newMessage, groupID } = req.body

        await Group.findByIdAndUpdate(

            groupID,
            { $push: { messages: newMessage } },
            { new: true }

        ).lean().then(() => [

            res.status(201).json(newMessage)

        ]).catch(err => console.error(err.message))

    }
}