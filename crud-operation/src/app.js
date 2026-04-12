const express = require("express")

const app = express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello world")
})

const note = []

app.get("/notes",(req,res)=>{
    res.send(note)
})


app.post("/notes",(req,res)=>{
    console.log(req.body)
    note.push(req.body)
    res.send(note)
})

app.delete("/notes/:index",(req,res)=>{
    delete note[req.params.index]
    res.send("deleted")
})

app.patch("/notes/:index",(req,res)=>{

    note[req.params.index].description = req.body.description 
    res.send("updated")
})
app.put("/notes/:index",(req,res)=>{

    note[req.params.index].description = req.body.description 
    res.send("data replaced")
})


module.exports = app