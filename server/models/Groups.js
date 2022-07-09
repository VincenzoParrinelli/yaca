const mongoose = require("mongoose")

const groupSchema = mongoose.Schema({

    groupName: String,

    groupPicID: String,

    founder: String,
    moderators: [String],
    members: [String],

    messages: [{
        _id: mongoose.ObjectId,
        senderID: String,
        text: String,

        createdAt: {
            type: String,
            default: Date(),

        }
        
    }]
})

module.exports = mongoose.model("Group", groupSchema)