import { useState,useEffect } from 'react'
import Image from 'next/image'

import styles from './newproject.module.css'

export default function NewProject(){

     const [name,setName] = useState('')
     const [description,setDescription] = useState('')

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
          <form onSubmit={onAdd} className={styles.form}>
               <div className={styles.container}>
                    <h1>Add new project</h1>
                    <div className={styles.input}>
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
                    <div className={styles.image}>
                         <input type='file' name='file' className={styles.inputFile} onChange={loadImage}/>
                         <button>Save</button>
                    </div>
                   
               </div>
          </form>
     );
}