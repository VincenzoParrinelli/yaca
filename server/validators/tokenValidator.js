const jwt = require("jsonwebtoken")

const validateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
        if (err) res.sendStatus(403)

        req.user = user
        next()
    })
}

module.exports = { validateToken }