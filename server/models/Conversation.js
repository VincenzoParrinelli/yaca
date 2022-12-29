const mongoose = require("mongoose")

const conversationSchema = mongoose.Schema({

    members: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],

    groupID: String,

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

module.exports = mongoose.model("Conversation", conversationSchema)