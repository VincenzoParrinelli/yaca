const validator = require("validator")
const User = require("../models/User.js")

const validateSignUpEmail = async (req, res, next) => {
    var email = req.body.email

    if (!validator.isEmail(email)) {
        res.json({ isValid: false, emailSent: false })

    } else await User.findOne({ email }).then(async data => {

        if (data) {
            res.json({ isValid: true, isPresent: true })
        } else {
            next()
        }
    })
}

const validateLoginEmail = async (req, res, next) => {

    var loginEmail = req.body.loginEmail

    //*******bad
    if (!validator.isEmail(loginEmail)) {
        res.json({ isValid: false })

    } else await User.findOne({ email: loginEmail }).then(async data => {
        if (data) {
            res.locals.data = data
            next()
        } else {
            res.json({ isValid: true, isPresent: false })
        }
    })
}


module.exports = { validateSignUpEmail, validateLoginEmail }