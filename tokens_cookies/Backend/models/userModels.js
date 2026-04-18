const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique: [true,"user allready exist with this email"]
    },
    password:String
})

const noteModel = mongoose.model("token",noteSchema)

module.exports = noteModel;