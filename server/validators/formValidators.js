const User = require("../models/User.js")
const { validateUsername, validateEmail, validatePassword } = require("../helpers/validators")

const validateForm = async (req, res, next) => {

    const { username, email, password } = req.body
    let errors = {}

    Object.assign(errors, validateUsername(username))
    Object.assign(errors, validateEmail(email))
    Object.assign(errors, validatePassword(password))

    if (errors.usernameErrors || errors.emailErrors || errors.passwordErrors) return res.status(400).send(errors)

    await User.findOne({ email }).then(async userData => {

        if (!userData) errors.emailErrors = { isPresent: false }

        if (errors.emailErrors) return res.status(400).send(errors)

        res.locals.userData = userData

        next()
    })


}

module.exports = { validateForm } 