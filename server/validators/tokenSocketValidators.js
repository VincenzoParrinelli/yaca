const jwt = require("jsonwebtoken")

const validateSocketToken = (socket, next) => {
    console.log("first")
    const authHeader = socket.request.headers.cookie
    const accessToken = ""

    if (!accessToken) next(new Error("401"))

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        //automatically refresh token on expiry
        if (err && err.name === "TokenExpiredError") {

            refreshSocketToken(socket, next)
        } else if (err) next(new Error("403"))
    })


    next()
}

const refreshSocketToken = (socket, next) => {
    const authHeader = socket.request.headers.cookie
    const refreshToken = authHeader && authHeader.split(" ")[1].split("=")[1].split(";")[0]

    if (!refreshToken) next(new Error("401"))

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) next(new Error("403")) 

        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20m" })
        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET)

        res.cookie("accessToken", accessToken, {
            httpOnly: true
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
        })
    })

    next()
}

module.exports = { validateSocketToken, refreshSocketToken }