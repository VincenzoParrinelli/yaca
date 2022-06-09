const validator = require("validator")
const User = require("../models/User.js")

const validateSignUpEmail = async (req, res, next) => {
    var email = req.body.email

    if (!validator.isEmail(email)) return res.json({ isValid: false, emailSent: false })

    await User.findOne({ email }).then(async data => {

        if (!data) return res.json({ isValid: true, isPresent: true })

        next()
    })
}

const validateLoginEmail = async (req, res, next) => {

    var loginEmail = req.body.loginEmail

    if (!validator.isEmail(loginEmail)) return res.json({ isValid: false })

    await User.findOne({ email: loginEmail }).then(async userData => {

        if (!userData) return res.json({ isValid: true, isPresent: false })

        res.locals.userData = userData

        next()
    })
}


module.exports = { validateSignUpEmail, validateLoginEmail }