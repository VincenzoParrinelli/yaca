const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())

app.use(express.json())

//DB connection

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

///

const userRouter = require("./routes/users")

app.use("/user", userRouter)

app.listen(PORT)
