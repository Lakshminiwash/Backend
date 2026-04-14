const mongoos = require("mongoose")

const noteSchema = new mongoos.Schema({
    title:String,
    description:String
})


const noteModel = mongoos.model("notes",noteSchema)

module.exports = noteModel

