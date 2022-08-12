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

const validateLoginEmail = async (req, res, next) => {

    const loginEmail = req.body.loginEmail
    const emailErrorsMap = new Map()

    if (!loginEmail) emailErrorsMap.set("emailErrors", { isEmpty: true })

    if (!validator.isEmail(loginEmail)) emailErrorsMap.set("emailErrors", { isInvalid: true })

    await User.findOne({ email: loginEmail }).then(async userData => {

        if (!userData) emailErrorsMap.set("emailErrors", { isPresent: false })

        res.locals.userData = userData
        res.locals.emailErrorsMap = emailErrorsMap

        next()
    })
}


module.exports = { validateSignUpEmail, validateLoginEmail }