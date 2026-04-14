// create and config server
const express = require("express")
const noteModal = require("./models/noteModels")

const app = express()
app.use(express.json())

app.post("/notes",async (req,res)=>{
     const {title,description} = req.body

     const note = await noteModal.create({
        title,description
     })

     res.status(201).json({
        message:"note created successfully",
        note
     })
})

app.get("/notes",async (req,res)=>{
    const notes = await noteModal.find()

    res.status(200).json({
        message:"notes received successfully",
        notes
    })
})




module.exports = app