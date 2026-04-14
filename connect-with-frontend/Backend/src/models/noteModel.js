const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    name:String,
    about:String
})

const notesModel = mongoose.model("2nd-notes",noteSchema)
module.exports = notesModel