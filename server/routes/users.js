const express = require("express")
const router = express.Router()

const { validateSignUpEmail, validateLoginEmail } = require("../validators/emailValidators")
const { validateSignUpPassword, validateLoginPassword } = require("../validators/passwordValidators")
const { validateToken } = require("../validators/tokenValidators")

const { sendConfirmEmail } = require("../emails/confirmEmail")

//import users controller
const userController = require("../controllers/user.controller")

router.post("/create-user", validateSignUpEmail, userController.createUser, sendConfirmEmail)

router.post("/activate-account", validateSignUpPassword, userController.activateAccount)

router.post("/login", validateLoginEmail, validateLoginPassword, userController.login)

router.post("/load", validateToken, userController.load)

router.post("/update", validateToken, userController.update)

router.delete("/logout", userController.logout)


module.exports = router