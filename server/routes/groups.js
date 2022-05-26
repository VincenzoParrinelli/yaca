const express = require("express")
const router = express.Router()

const { validateToken } = require("../validators/tokenValidators")

const groupController = require("../controllers/group.controller")

router.use(validateToken)

router.post("/create-group", groupController.createGroup)

module.exports = router
