const express = require("express")
const router = express.Router()
const User = require("../models/User.js")
const validator = require("validator")
const nodemailer = require("nodemailer")
const fs = require("fs")
const handlebars = require("handlebars")
const bcrypt = require("bcrypt")

const validateEmail = async (req, res, next) => {
    var email = req.body.email

    if (!validator.isEmail(email)) {
        res.json({ isValid: false, emailSent: false })
    } else {
        await User.findOne({ email }).then(async data => {
            if (data) {
                res.json({ isValid: true, isPresent: true })
            } else {
                next()
            }
        })
    }

}

const sendConfirmEmail = async (req, res) => {
    var email = req.body.email

    const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,

        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
    })

    // read html file with fs boilerplate function

    const readHTMLfile = (path, cb) => {
        fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
            if (err) {
                cb(err);
                throw err;

            }
            else {
                cb(null, html);
            }
        });
    }

    //call previous function and enable hbs file to accept variables (see replacements obj) 
    //and finally send email afterwards

    readHTMLfile("./views/confirmEmail.hbs", (err, html) => {
        var template = handlebars.compile(html)

        var replacements = {
            email: email
        }

        var htmlToSend = template(replacements)

        const options = {
            from: process.env.MAIL_USER,
            to: email,
            subject: "Please confirm your email",
            html: htmlToSend
        }

        transport.sendMail(options, (err) => {
            if (err) {
                res.status(500).send(err.message)
            } else {
                res.json({ isValid: true, isPresent: false, emailSent: true })
            }
        })
    })

}

const validatePassword = async (req, res, next) => {
    var password = req.body.password
    var password2 = req.body.password2

    if (!validator.isStrongPassword(password)) {

        res.json({ isValid: false })

    } else if (password !== password2) {

        res.json({ isValid: true, isMatch: false })

    } else next()

}


router.post("/create-user", validateEmail, async (req, res, next) => {
    var email = req.body.email

    await User.create({ email }).then(async data => {

        next()

    }).catch(err => console.error(err.message))

}, sendConfirmEmail)

router.post("/activate-account", validatePassword, async (req, res) => {
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
})

router.post("/login", (req, res) => {
    
})

router.post("/logout", (req, res) => {

})

module.exports = router