const User = require("../models/User.js")
const { validateEmail, validatePassword } = require("../helpers/emailAndPasswordValidator")

const validateLoginForm = async (req, res, next) => {

    const { loginEmail, password } = req.body
    let errors = {}

    Object.assign(errors, validateEmail(loginEmail))
    Object.assign(errors, validatePassword(password))

    if (errors.emailErrors || errors.passwordErrors) return res.status(400).send(errors)

    await User.findOne({ email: loginEmail }).then(async userData => {

        if (!userData) errors.emailErrors = { isPresent: false }

        if (errors.emailErrors) return res.status(400).send(errors)

        res.locals.userData = userData

        next()
    })


}

module.exports = { validateLoginForm } 