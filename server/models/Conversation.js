const mongoose = require("mongoose")

const conversationSchema = mongoose.Schema({

    members: [String],

    messages: [{
        _id: mongoose.ObjectId,
        senderID: String,
        text: String,

        createdAt: {
            type: String,
            default: new Date().toLocaleString()
        }
    }]
})

module.exports = mongoose.model("Conversation", conversationSchema)