const mongoose = require("mongoose")

const conversationSchema = mongoose.Schema({

    firstUserID: {
        type: String,
    },

    secondUserID: {
        type: String,
    },

    messages: [{
        _id: mongoose.ObjectId,
        senderID: String,
        text: String,

        createdAt: {
            type: String,
            default: new Date().toUTCString()
        }
    }]
})

module.exports = mongoose.model("Conversation", conversationSchema)