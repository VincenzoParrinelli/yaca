const express = require("express")
const router = express.Router()
const User = require("../models/User.js")
const validator = require("validator")
const nodemailer = require("nodemailer")
const fs = require("fs")
const { promisify } = require('util')

const validateEmail = async (req, res, next) => {
    var email = req.body.email

    if (!validator.isEmail(email)) res.json({ isValid: false })

    await User.findOne({ email }).then(async data => {
        if (data) {
            res.json({ isValid: true, isPresent: true })
        } else {
            next()
        }
    })
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

    const readFile = promisify(fs.readFile);

    const options = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Please confirm your email",
        html: await readFile("./views/index.html", "utf-8")
    }

    transport.sendMail(options, (err) => {
        if (err) {
            res.status(500).send(err.message)
        } else {
            console.log("sent");
            res.json({ isValid: true, isPresent: false, emailSent: true })
        }
    })
}


router.post("/createUser", validateEmail, async (req, res, next) => {
    var email = req.body.email

    await User.create({ email }).then(async data => {
        var id = data._id

        next()
    }).catch(err => console.error(err.message))

}, sendConfirmEmail)

router.post("/login", (req, res) => {

})

router.post("/logout", (req, res) => {

})

module.exports = router