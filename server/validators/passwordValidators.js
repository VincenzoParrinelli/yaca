const validator = require("validator")

const validateSignUpPassword = async (req, res, next) => {
    var password = req.body.password
    var password2 = req.body.password2

    if (!validator.isStrongPassword(password)) {

        res.json({ isValid: false })

    } else if (password !== password2) {

        res.json({ isValid: true, isMatch: false })

    } else next()

}

const validateLoginPassword = async (req, res, next) => {
    var password = req.body.password

    if (!validator.isStrongPassword(password)) {
        res.json({ isValid: false })
    } else {
        next()
    }
}

module.exports = { validateSignUpPassword, validateLoginPassword }