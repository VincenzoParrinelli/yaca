const validator = require("validator")

const validateUsername = username => {

    if (!username) return { usernameErrors: { isEmpty: true } }

}

const validateEmail = email => {

    if (!email) return { emailErrors: { isEmpty: true } }

    if (!validator.isEmail(email)) return { emailErrors: { isInvalid: true } }
}

const validatePassword = password => {

    if (!password) return { passwordErrors: { isEmpty: true } }

    if (!validator.isStrongPassword(password)) return { passwordErrors: { isInvalid: true } }

}

module.exports = { validateUsername, validateEmail, validatePassword }