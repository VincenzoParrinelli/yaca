const validator = require("validator")
const User = require("../models/User.js")

const validateUsername = username => {

    if (!username) return { usernameErrors: { isEmpty: true } }

}

const validateEmail = async (email, req, res) => {

    if (!email) return { emailErrors: { isEmpty: true } }

    if (!validator.isEmail(email)) return { emailErrors: { isInvalid: true } }

    return await User.findOne({ email }).then(userData => {

        if (!userData && req.path !== "/register") return { emailErrors: { loginIsPresent: false } }

        if (userData && req.path === "/register") return { emailErrors: { signupIsPresent: true } }

        res.locals.userData = userData
    })

}

const validatePassword = password => {

    if (!password) return { passwordErrors: { isEmpty: true } }

    if (!validator.isStrongPassword(password)) return { passwordErrors: { isInvalid: true } }

}

module.exports = { validateUsername, validateEmail, validatePassword }