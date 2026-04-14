const express = require("express")
const app = express()
app.use(express.json())
const cors = require("cors")

app.use(cors())

const notesModel = require("./models/noteModel")

app.post("/notes",async (req,res)=>{
    const {name,about} = req.body
    const note = await notesModel.create({
        name,about
    })

    res.status(201).json({
        message:"notes created successfully",
        note
    })
})

app.get("/notes",async (req,res)=>{
    const allData = await notesModel.find()

    res.status(200).json({
        message:"data received successfully",
        allData
    })
})

app.delete("/notes/:id",async (req,res)=>{
    const id = req.params.id
    await notesModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"notes deleted successfully"
    })
})

app.patch("/notes/:id",async (req,res)=>{
    const id = req.params.id
    const {about} = req.body
    await notesModel.findByIdAndUpdate(id,{about})

    res.status(200).json({
        message:"notes updated successfully"
    })
})
module.exports = app