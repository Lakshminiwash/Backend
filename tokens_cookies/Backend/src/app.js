const express = require("express")
const noteModel = require("../models/userModels")
const authrouter = require("../routes/authroute")

const app = express();
app.use(express.json())

app.use("/api/auth",authrouter)


module.exports = app