const mongoose = require("mongoose")

const groupSchema = mongoose.Schema({

    groupName: String,

    groupPicID: String,

    founder: String,
    moderators: [String],

    members: [String]

})

module.exports = mongoose.model("Group", groupSchema)