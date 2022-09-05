const jwt = require("jsonwebtoken")

const createLoginTokens = (req, res) => {
    const userData = res.locals.userData

    //convert user object whose coming from mongoose to json
    const userToJSON = userData.toJSON()

    //create access and refresh token
    const accessToken = jwt.sign({ id: userToJSON._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20m" })
    const refreshToken = jwt.sign({ id: userToJSON._id }, process.env.REFRESH_TOKEN_SECRET)

    res.cookie("accessToken", accessToken, {
        httpOnly: true
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
    })

    res.json({ isLogged: true, userData: userToJSON })

}

module.exports = { createLoginTokens }