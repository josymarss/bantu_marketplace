import { useState,useEffect } from 'react'

import styles from './newproject.module.css'

export default function NewProject(){

     const [name,setName] = useState('josymar')
     const [description,setDescription] = useState('negociar o app nante, com 30% das accoes')
     const [imageRef, setImageRef] = useState('')

     const onSaveApp = async (e) => {
          e.preventDefault()
          const res = await fetch(`${process.env.END_POINT}/negociation/new`, {
               method: 'POST',
               headers:{'Content-Type':'application/json'},
               body: JSON.stringify({name, description})     
          }).then(r => r.json())  
          const { token } = res
     }
     const loadImage = (e) => {
          setImageRef(URL.createObjectURL(e.target.files[0]))
     }
     
     return(
          <form className={styles.form}>
               <div className={styles.container}>
                    <h1>Add new project</h1>
                    <img src={imageRef} />
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
                         <input 
                              type='file' 
                              name='file' 
                              accept="image/png, image/jpeg" 
                              className={styles.inputFile} 
                              onChange={loadImage} 
                         />
                         <button onClick={onSaveApp}>Salvar dados</button>
                    </div> 
               </div>
          </form>
     );
}