const validator = require("validator")

const validateEmail = email => {

    if (!email) return { emailErrors: { isEmpty: true } }
    
    if (!validator.isEmail(email)) return { emailErrors: { isInvalid: true } }
}

const validatePassword = password => {

    if (!password) return { passwordErrors: { isEmpty: true } }

    if (!validator.isStrongPassword(password)) return { passwordErrors: { isInvalid: true } }

}

module.exports = { validateEmail, validatePassword }