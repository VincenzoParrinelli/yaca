const jwt = require("jsonwebtoken")

const validateActivationToken = (req, res, next) => {
    const { token } = req.body

    if (!token) return res.status(401)

    jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET, err => {

        if (err) return res.status(403).json({ activationErrors: { isInvalid: true } })

        next()
    })
}

const validateAccessToken = (req, res, next) => {
    const authHeader = req.headers.cookie
    const accessToken = authHeader && authHeader.split(" ")[0].split("=")[1].split(";")[0]

    if (!accessToken) return res.sendStatus(401)

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        //automatically refresh token on expiry
        if (err && err.message === "jwt expired") {
            
            console.log(err.message)

            refreshToken(req, res, next)
        } else if (err) return res.sendStatus(403)

        next()
    })
}

const refreshToken = (req, res, next) => {
    const authHeader = req.headers.cookie
    const refreshToken = authHeader && authHeader.split(" ")[1].split("=")[1].split(";")[0]

    if (!refreshToken) return res.sendStatus(401)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {

        if (err) return res.sendStatus(403)

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

module.exports = { validateActivationToken, validateAccessToken, refreshToken }