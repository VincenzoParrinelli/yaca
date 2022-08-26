const express = require("express")
const router = express.Router()

const { validateLoginForm } = require("../validators/formValidators")
const { validateSignUpEmail } = require("../validators/emailValidators")
const { validateSignUpPassword } = require("../validators/passwordValidators")
const { validateToken } = require("../validators/tokenValidators")

const { sendConfirmEmail } = require("../emails/confirmEmail")

//import users controller
const userController = require("../controllers/user.controller")

router.post("/create-user", validateSignUpEmail, userController.createUser, sendConfirmEmail)

router.post("/activate-account", validateSignUpPassword, userController.activateAccount)

router.post("/login", validateLoginForm, userController.login)

router.post("/update", validateToken, userController.update)

router.delete("/logout", userController.logout)


module.exports = router