const validator = require("validator")

const validateSignUpPassword = async (req, res, next) => {
    var password = req.body.password
    var password2 = req.body.password2

    if (!validator.isStrongPassword(password)) return res.json({ isValid: false })

    if (password !== password2) return res.json({ isValid: true, isMatch: false })

    next()

}

const validateLoginPassword = async (req, res, next) => {
    var password = req.body.password
    
    if (!validator.isStrongPassword(password)) return res.json({ isValid: false })

    next()

}

module.exports = { validateSignUpPassword, validateLoginPassword }