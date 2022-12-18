const express = require("express")
const router = express.Router()

const { validateAccessToken } = require("../validators/tokenValidators")

const groupController = require("../controllers/group.controller")

router.use(validateAccessToken)

router.post("/create-group", groupController.createGroup)

module.exports = router
