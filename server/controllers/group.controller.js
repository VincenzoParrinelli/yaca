const Group = require("../models/Groups.js")

module.exports = {
    createGroup: async (req, res) => {

        const { groupName, groupPicId } = req.body

        await Group.create({ groupName, groupPicId }).then(group => {

            res.json(group)
            
        }).catch(err => console.error(err.message))

    
    }
}