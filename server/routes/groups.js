const express = require("express")
const router = express.Router()

const { validateAccessToken } = require("../validators/tokenValidators")

const groupController = require("../controllers/group.controller")

router.use(validateAccessToken)

router.post("/create-group", groupController.createGroup)

router.get("/get-all-group-messages/:groupID", groupController.getAllGroupMessages)

router.post("/send-group-message", groupController.sendGroupMessage)

module.exports = router
