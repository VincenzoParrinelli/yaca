const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
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

    createdAt: {
        type: Date,
        expires: "10m",
        default: Date.now
    }
})

module.exports = mongoose.model("User", userSchema)