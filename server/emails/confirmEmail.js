const nodemailer = require("nodemailer")
const path = require("path")
const hbs = require("nodemailer-express-handlebars")

const sendConfirmEmail = async (req, res) => {
    const email = req.body.email
    const { activationToken } = res.locals.newUserData

    const transport = nodemailer.createTransport({

        service: "Gmail",
        secure: true,

        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
    })

    const handlebarsOptions = {
        viewEngine: {
            partialsDir: path.resolve("./views"),
            defaultLayout: false
        },

        viewPath: path.resolve("./views")
    }

    transport.use("compile", hbs(handlebarsOptions))

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Thank you. Please confirm your account",
        template: "confirmEmail",

        context: {
            email,
            activationToken
        }
    }

    transport.sendMail(mailOptions, err => {
        if (!err) res.sendStatus(201)
    })

}

module.exports = { sendConfirmEmail }