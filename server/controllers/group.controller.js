const Group = require("../models/Groups.js")
const User = require("../models/User.js")

module.exports = {
    createGroup: async (req, res) => {

        const { groupName, groupPicId, userID } = req.body

        await Group.create({ groupName, groupPicId, members: [userID] }).then(group => {

            res.json(group)

        }).catch(err => console.error(err.message))

    },

    getGroup: async (req, res) => {

        const { selectedGroupID } = req.query

        await Group.findById(selectedGroupID).select({ "messages": 1, "members": 1 }).then(async group => {

            //find group members metadata and send them to client along with group data
            await User.find({ _id: [group.members] }).select({ "username": 1, "email": 1, "profilePicId": 1, "socketID": 1 })
                .then(members => {

                    res.json({group, members})
                }).catch(err => console.error(err.message))

        }).catch(err => console.error(err.message))
    }
}