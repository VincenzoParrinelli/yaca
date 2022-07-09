const Group = require("../models/Groups.js")
const User = require("../models/User.js")

module.exports = {
    createGroup: async (req, res) => {

        const { groupName, groupPicID, userID } = req.body

        await Group.create({ groupName, groupPicID, founder: userID }).then(group => {

            res.json(group)

        }).catch(err => console.error(err.message))

    },

    getGroup: async (req, res) => {

        const { selectedGroupID } = req.query

        await Group.findById(selectedGroupID).select({ "messages": 1, "founder": 1, "moderators": 1, "members": 1 }).then(async group => {

            //initialize a payload object
            let payload = {
                group,
                founder: {},
                members: [],
                moderators: []
            }

            //find founder metadata and store it in payload, afterwards if members exist get their metadata,
            //do the same thing for moderators, finally send payload
            await User.find({ _id: group.founder }).select({ "username": 1, "email": 1, "profilePicID": 1, "socketID": 1 })
                .then(founder => {

                    payload.founder = founder[0] //specify 0 as index in order to get only the object
                }).catch(err => console.error(err.message))

            if (group.members) {

                await User.find({ _id: group.members }).select({ "username": 1, "email": 1, "profilePicID": 1, "socketID": 1 })
                    .then(members => {

                        payload.members.push(members)
                    }).catch(err => console.error(err.message))
            }

            if (group.moderators) {

                await User.find({ _id: group.moderators }).select({ "username": 1, "email": 1, "profilePicID": 1, "socketID": 1 })
                    .then(moderators => {

                        payload.moderators.push(moderators)
                    }).catch(err => console.error(err.message))
            }

            res.json(payload)
        }).catch(err => console.error(err.message))
    }
}