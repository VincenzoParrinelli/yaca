const express = require("express")
const router = express.Router()

const { validateToken } = require("../validators/tokenValidators")

//import conversations controller
const conversationController = require("../controllers/conversation.controller")

router.use(validateToken)

router.get("/get-conversation/:currentID/:friendID", conversationController.getConversation)

module.exports = router