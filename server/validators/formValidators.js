const { validateUsername, validateEmail, validatePassword } = require("../helpers/validators")

const validateForm = async (req, res, next) => {

    const { username, email, password } = req.body
    errors = {}

    if (req.path === "/register") Object.assign(errors, validateUsername(username))
    Object.assign(errors, await validateEmail(email, req, res))
    Object.assign(errors, validatePassword(password))

    if (errors.usernameErrors || errors.emailErrors || errors.passwordErrors) return res.status(400).send(errors)

    next()

}

module.exports = { validateForm } 