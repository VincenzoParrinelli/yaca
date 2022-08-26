const validator = require("validator")
const User = require("../models/User.js")

const validateSignUpEmail = async (req, res, next) => {
    const email = req.body.email

    if (!validator.isEmail(email)) return res.json({ isValid: false, emailSent: false })

    await User.findOne({ email }).then(async data => {

        if (!data) return res.json({ isValid: true, isPresent: true })

        next()
    })
}


module.exports = { validateSignUpEmail }