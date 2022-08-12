const validator = require("validator")

const validateSignUpPassword = async (req, res, next) => {
    const password = req.body.password
    const password2 = req.body.password2

    if (!validator.isStrongPassword(password)) return res.json({ isValid: false })

    if (password !== password2) return res.json({ isValid: true, isMatch: false })

    next()

}

const validateLoginPassword = async (req, res, next) => {
    const password = req.body.password
    const passwordErrorsMap = new Map()

    if (!password) passwordErrorsMap.set("passwordErrors", { isEmpty: true })

    if (!validator.isStrongPassword(password)) passwordErrorsMap.set("passwordErrors", { isInvalid: true })

    res.locals.passwordErrorsMap = passwordErrorsMap

    next()

}

module.exports = { validateSignUpPassword, validateLoginPassword }