const express = require("express")
const router = express.Router()

const { validateAccessToken } = require("../validators/tokenValidators")

//import conversations controller
const conversationController = require("../controllers/conversation.controller")

router.use(validateAccessToken)

router.get("/get-conversation/:currentID/:friendID", conversationController.getConversation)

module.exports = router