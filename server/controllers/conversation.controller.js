const Conversation = require("../models/Conversation.js")

module.exports = {
    getConversation: async (req, res) => {

        const { currentID, friendID } = req.params

        //check if conversation exists in db, if yes return it, otherwise create a new one and send it afterwards 
        await Conversation.findOne({ firstUserID: currentID, secondUserID: friendID }).then(async conversation => {

            if (conversation) return res.json(conversation)

            await Conversation.create({ firstUserID: currentID, secondUserID: friendID }).then(newConversation => {
                
                res.json(newConversation)
    
            }).catch(err => console.error(err.message))

        })
    }
}