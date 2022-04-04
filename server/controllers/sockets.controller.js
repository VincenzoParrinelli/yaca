const { validateSocketToken } = require("../validators/tokenSocketValidators.js")

module.exports = io => {

    io.use((socket, next) => {
        validateSocketToken(socket, next)
    })
    
    io.on("connection", socket => {
        console.log(socket.id)

        socket.on("search-users", username => {
            console.log(username)
          
        })
    })

}

