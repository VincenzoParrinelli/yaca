const User = require("../models/User.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = {
    createUser: async (req, res, next) => {
        var email = req.body.email

        await User.create({ email }).then(async data => {

            next()

        }).catch(err => console.error(err.message))

    },


    activateAccount: async (req, res) => {
        var id = req.body.id
        var username = req.body.username
        var password = req.body.password

        await User.findOne({ id }).then(async data => {
            if (data) {

                if (data.password === "NOT SET" || data.username === "NOT SET") {
                    try {
                        const hashedPassword = await bcrypt.hash(password, 10)

                        await User.findByIdAndUpdate(id, {

                            password: hashedPassword, username, $unset: { createdAt: 1 }

                        }).then(() => {

                            res.json({ isValid: true, isMatch: true, payload: data, hashedPassword })

                        }).catch(err => console.error(err.message))

                    } catch {
                        res.status(500).send(err.message)
                    }

                } else {
                    res.json({ isValid: true, isPresent: true, isMatch: true })
                }
            } else {
                res.json({ isValid: true, isPresent: false })
            }

        }).catch(err => console.error(err.message))
    },

    login: async (req, res) => {
        var data = res.locals.data
        var password = req.body.password

        if (await bcrypt.compare(password, data.password)) {
            //convert user object whose coming from mongoose to json
            const userToJSON = data.toJSON()

            //create access and refresh token
            const accessToken = jwt.sign({ id: userToJSON._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20m" })
            const refreshToken = jwt.sign({ id: userToJSON._id }, process.env.REFRESH_TOKEN_SECRET)

            res.cookie("accessToken", accessToken, {
                httpOnly: true
            })

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
            })

            const user = data

            res.json({ isLogged: true, isValid: true, user })
        } else {
            res.json({ isLogged: false, isValid: false })
        }
    },

    update: async (req, res) => {
        var newProPicId = req.body.data.newProPic.split("/")[3]
        var id = req.body.data._id

        if (newProPicId) {
            await User.findOneAndUpdate(id, {
                profilePicId: newProPicId
            }, { new: true }).then((data) => {

                console.log({ username: data.username, profilePicId: data.profilePicId })
               
                res.json({ username: data.username, profilePicId: data.profilePicId })
            }).catch(err => console.error(err.message))

        } else return

    }
}