const jwt = require("jsonwebtoken")

const validateToken = (req, res, next) => {
    const authHeader = req.headers.cookie
    const accessToken = authHeader && authHeader.split(" ")[0].split("=")[1].split(";")[0]

    if (!accessToken) res.sendStatus(401)

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) res.sendStatus(403)

        next()
    })
}

const refreshToken = (req, res, next) => {
    const authHeader = req.headers.cookie
    const refreshToken = authHeader && authHeader.split(" ")[1].split("=")[1].split(";")[0]

    if (!refreshToken) res.sendStatus(401)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) res.sendStatus(403)

        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20m" })
        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET)

        res.cookie("accessToken", accessToken, {
            httpOnly: true
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
        })

        next()
    })
}

module.exports = { validateToken, refreshToken }