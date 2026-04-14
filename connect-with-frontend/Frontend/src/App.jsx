import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react'


const App = () => {


const [notes, setNotes] = useState([])
 function fetchNotes(){
   axios.get("http://localhost:3000/notes")
.then((res)=>{
   setNotes(res.data.allData)
})
}
useEffect(() => {
  fetchNotes()
}, [])

  return (
    <div className='container'>
       {
        notes.map((item,idx) => {
        return <div key={idx} className="cards">
          <h1>{item.name}</h1>
          <h3>{item.about}</h3>
       </div>
       })
       }
    </div>
  )
}

export default App
