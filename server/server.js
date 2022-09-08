const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const cloudinary = require("cloudinary").v2

require("dotenv").config()

///Basic server setup
const app = express()
const server = require("http").createServer(app)
const PORT = process.env.PORT || 5000

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }))

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())


//DB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//Cloudinary connection
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//routers
const userRouter = require("./routes/users")
const conversationRouter = require("./routes/conversations")
const groupRouter = require("./routes/groups")

app.use("/user", userRouter)
app.use("/conversation", conversationRouter)
app.use("/group", groupRouter)


//Socket setup
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
        methods: ["GET", "POST"]
    }
})

//Handle socket.io in this file
require("./controllers/socket.controller")(io)



server.listen(PORT)
