const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")

require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }))

app.use(express.json())

app.use(cookieParser())

//DB connection

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

///

//routers

const userRouter = require("./routes/users")

app.use("/user", userRouter)

///

app.listen(PORT)
