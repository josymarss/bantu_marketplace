import { useState,useEffect } from 'react'
import Image from 'next/image'

export default function NewProject(){

     const [name,setName] = useState('')
     const [name,setDescription] = useState('')

     const onAdd = () => {
          e.preventDefault()
          fecth('/api/newnegociation',{
               body: JSON.stringify({
                    name,
                    description
               }),
               headers: {
                 'Content-Type': 'application/json'
               },
               method: 'POST'
          }) 
     }
     const loadImage = () => {

     }
     
     return(
          <form onSubmit={onAdd} className='container'>
               <h1>Add new project</h1>
               <div className='input'>
                    <input
                         type='text'
                         name='name' 
                         placeholder='App name' 
                         onChange={e => setName(e.target.value)}
                    />
                    <input
                         type='text'
                         name='descritption' 
                         placeholder='Description' 
                         onChange={e => setDescription(e.target.value)}
                    />
               </div>
               <div className='image'>
                    <input type='file' name='file' onChange={loadImage}/>
                    <button>Add image</button>
               </div>
               <button>Save</button>
          </form>
     );
}