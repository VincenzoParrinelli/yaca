const express = require("express")
const router = express.Router()

const { validateSignUpEmail, validateLoginEmail } = require("../validators/emailValidators")
const { validateSignUpPassword, validateLoginPassword } = require("../validators/passwordValidators")

const { sendConfirmEmail } = require("../emails/confirmEmail")

const userController = require("../controllers/user.controller")

router.post("/create-user", validateSignUpEmail, userController.createUser, sendConfirmEmail)

router.post("/activate-account", validateSignUpPassword, userController.activateAccount)

router.post("/login", validateLoginEmail, validateLoginPassword, userController.login)

router.post("/logout", (req, res) => {

})

module.exports = router