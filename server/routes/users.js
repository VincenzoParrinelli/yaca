const express = require("express")
const router = express.Router()

const { validateForm } = require("../validators/formValidators")
const { validateToken } = require("../validators/tokenValidators")

const { sendConfirmEmail } = require("../emails/confirmEmail")

//import users controller
const userController = require("../controllers/user.controller")

router.post("/register", validateForm, userController.register, sendConfirmEmail)

router.post("/activate-account", userController.activateAccount)

router.post("/login", validateForm, userController.login)

router.post("/update", validateToken, userController.update)

router.delete("/logout", userController.logout)


module.exports = router