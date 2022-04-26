const mongoose = require("mongoose")

const userSchema = mongoose.Schema({

    socketID: {
        type: String,
        default: "OFFLINE"
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        default: "NOT SET"
    },

    username: {
        type: String,
        default: "NOT SET"
    },

    profilePicId: {
        type: String,
        default: ""
    },

    friendList: [{
        type: String,
        default: "EMPTY"
    }],

    friendRequests: [{
        type: String,
        default: "EMPTY"
    }],
      
    createdAt: {
        type: Date,
        expires: "10m",
        default: Date.now
    }
})

module.exports = mongoose.model("User", userSchema)