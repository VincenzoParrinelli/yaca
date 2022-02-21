const express = require("express")
const router = express.Router()

const { validateSignUpEmail, validateLoginEmail } = require("../validators/emailValidators")
const { validateSignUpPassword, validateLoginPassword } = require("../validators/passwordValidators")
const { validateToken, refreshToken } = require("../validators/tokenValidators")

const { sendConfirmEmail } = require("../emails/confirmEmail")

const userController = require("../controllers/user.controller")

router.post("/create-user", validateSignUpEmail, userController.createUser, sendConfirmEmail)

router.post("/activate-account", validateSignUpPassword, userController.activateAccount)

router.post("/login", validateLoginEmail, validateLoginPassword, userController.login)

router.post("/update", validateToken, userController.update)

router.post("/refresh-token", refreshToken)

module.exports = router