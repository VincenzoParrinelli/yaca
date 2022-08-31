const mongoose = require("mongoose")

const userSchema = mongoose.Schema({

    socketID: {
        type: String,
        default: "OFFLINE"
    },

    activationToken: {
        type: String,
    },

    verified: {
        type: Boolean,
        default: false
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

    friendRequestsPending: [{
        type: String,
        default: "EMPTY"
    }],

    friendRequests: [{
        type: String,
        default: "EMPTY"
    }],

    createdAt: {
        type: Date,
        expires: "1d",
        default: Date.now
    }
})

module.exports = mongoose.model("User", userSchema)