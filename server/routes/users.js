const express = require("express")
const router = express.Router()

const { validateForm } = require("../validators/formValidators")
const { validateActivationToken, validateAccessToken } = require("../validators/tokenValidators")
const { createLoginTokens } = require("../helpers/createLoginTokens")

const { sendConfirmEmail } = require("../emails/confirmEmail")

//import users controller
const userController = require("../controllers/user.controller")

router.post("/register", validateForm, userController.register, sendConfirmEmail)

router.post("/activate-account", validateActivationToken, userController.activateAccount, createLoginTokens)

router.post("/login", validateForm, userController.login)

router.patch("/changeUsername", validateAccessToken, validateForm, userController.changeUsername)

router.post("/searchUsers", validateAccessToken, userController.searchUsers)

router.delete("/logout", userController.logout)


module.exports = router