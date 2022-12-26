const Group = require("../models/Groups.js")

module.exports = {
    createGroup: async (req, res) => {

        const { groupName, groupPicID, userID } = req.body

        await Group.create({ groupName, groupPicID, members: [{ userData: userID, role: ["admin"] }] }).then(group => {

            res.json(group)

        }).catch(err => console.error(err.message))

    },
}