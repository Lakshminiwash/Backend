import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react'


const App = () => {


const [notes, setNotes] = useState([])
 function fetchNotes(){
   axios.get("https://backend-si2a.onrender.com/notes")
.then((res)=>{
   setNotes(res.data.allData)
})
}

useEffect(() => {
  fetchNotes()
}, [])

function onsubmitHandler(e){
  e.preventDefault();

  const {naam,about} = e.target.elements
  axios.post("https://backend-si2a.onrender.com/notes",{
    name:naam.value,
    about:about.value
  }).then(()=>{
      fetchNotes();
      naam.value = "";
      about.value = "";
  })
}

function removeHandler(noteId){
  axios.delete("https://backend-si2a.onrender.com/notes/"+noteId)
 .then(() => {
  fetchNotes()
  })
}

function editHandler(noteId, currentName, currentAbout) {
  const name = prompt("Enter new name", currentName)
  const about = prompt("Enter new about", currentAbout)
  if (name === null || about === null) return

  axios.patch(`https://backend-si2a.onrender.com/${noteId}`, {
    name,
    about
  }).then(() => {
    fetchNotes()
  })
}

  return (

   <>
   <div className="nav">
    <form onSubmit={onsubmitHandler}>
      <input name='naam' type="text" placeholder='enter name'/>
      <input name="about" type="text" placeholder='enter about'/>
      <button>Add</button>
    </form>
   </div>
    <div className='container'>
      
       {
        notes.map((item,idx) => {
        return <div key={idx} className="cards">
          <h1>{item.name}</h1>
          <h3>{item.about}</h3>
          <button onClick={()=>{removeHandler(item._id)}}>Remove</button>
          <button onClick={()=>{editHandler(item._id, item.name, item.about)}}>Edit</button>
       </div>
       })
       }
    </div>
   </>
  )
}

export default App
