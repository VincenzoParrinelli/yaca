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
    const accessToken = authHeader?.split(" ")[0].split("=")[1].split(";")[0]

    if (!accessToken) return res.sendStatus(401)

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {

        if (err?.name === "TokenExpiredError") {

            const refreshToken = authHeader?.split(" ")[1].split("=")[1].split(";")[0]

            if (!refreshToken) return res.sendStatus(401)

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {

                if (err) return res.sendStatus(401)

                const newAccessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20m" })

                res.cookie("accessToken", newAccessToken, {
                    httpOnly: true,
                    secure: true
                })

                next()
            })

        } else return res.status(401)


    })
}


module.exports = { validateActivationToken, validateAccessToken }