const express = require("express")
const router = express.Router()

const { validateAccessToken } = require("../validators/tokenValidators")

//import conversations controller
const conversationController = require("../controllers/conversation.controller")

router.use(validateAccessToken)

router.post("/new-conversation", conversationController.newConversation)

router.get("/get-conversation/:userID/:friendID", conversationController.getConversation)

module.exports = router