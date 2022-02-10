const nodemailer = require("nodemailer")
const fs = require("fs")
const handlebars = require("handlebars")

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

module.exports = { sendConfirmEmail }