const User = require("../models/User.js")
const bcrypt = require("bcrypt")

module.exports = {
    createUser: async (req, res, next) => {
        var email = req.body.email

        await User.create({ email }).then(async data => {

            next()

        }).catch(err => console.error(err.message))

    },

    activateAccount: async (req, res) => {
        var id = req.body.id
        var password = req.body.password

        await User.findOne({ id }).then(async data => {
            if (data) {

                if (data.password === "NOT SET") {
                    try {
                        const hashedPassword = await bcrypt.hash(password, 10)

                        await User.findByIdAndUpdate(id, {

                            password: hashedPassword, $unset: { createdAt: 1 }

                        }).then(() => {

                            res.json({ isValid: true, isMatch: true })

                        }).catch(err => console.error(err.message))

                    } catch {
                        res.status(500).send(err.message)
                    }

                } else {
                    res.json({ isValid: true, isPresent: true, isMatch: true })
                }
            } else {
                res.json({ isPresent: false })
            }

        }).catch(err => console.error(err.message))
    },

    login: async (req, res) => {
        var data = res.locals.data
        var password = req.body.password

        if (await bcrypt.compare(password, data.password)) {
            res.json({ isLogged: true, isValid: true, data })
        } else {
            res.json({ isLogged: false, isValid: false })
        }
    }
}