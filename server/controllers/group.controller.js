const Group = require("../models/Groups.js")
const User = require("../models/User.js")

module.exports = {
    createGroup: async (req, res) => {

        const { groupName, groupPicId, userID } = req.body

        await Group.create({ groupName, groupPicId, members: [userID] }).then(async group => {

            res.json(group)

        }).catch(err => console.error(err.message))

    },

    getGroup: async (req, res) => {

        console.log(req.params)
    }
}