const mongoose = require("mongoose")

const groupSchema = mongoose.Schema({

    groupName: String,

    groupPicID: String,

    members: [{

        userData: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },

        role: [{
            type: String,
            enum: ["admin", "user"],
            default: "user"
        }],

        createdAt: {
            type: Date,
            default: Date.now,
        },

    }],

    messages: [{
        _id: mongoose.ObjectId,
        senderID: String,
        text: String,

        createdAt: {
            type: Date,
            default: Date.now,
        }

    }]

})

module.exports = mongoose.model("Group", groupSchema)