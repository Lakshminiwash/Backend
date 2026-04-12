const express = require("express")

const app = express();
app.use(express.json())

const note = []
app.post("/notes", (req, res) => {

    note.push(req.body)
    res.send(note)
})

// app.get("/hello",(req,res)=>{
//     res.send("hello kaise ho , aur batao")
// })


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})