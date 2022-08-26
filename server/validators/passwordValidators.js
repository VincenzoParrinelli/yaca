const validator = require("validator")

const validateSignUpPassword = async (req, res, next) => {
    const password = req.body.password
    const password2 = req.body.password2

    if (!validator.isStrongPassword(password)) return res.json({ isValid: false })

    if (password !== password2) return res.json({ isValid: true, isMatch: false })

    next()

}

module.exports = { validateSignUpPassword }