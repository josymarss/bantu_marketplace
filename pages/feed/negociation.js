import {useState} from 'react'

import styles from './negociation.module.css'

export default function negociation(){

    const [description, setDescription] = useState('')
    
    const onSendNegociation = async (e) =>{
        e.preventDefault()
        const data = await fecth(`${process.env.END_POINT}/negociation/new`,{
          method: 'POST',
          headers: {'Content-Type': 'application/json','Accept': 'application/json'},
            body: JSON.stringify({description})
        }).then(res => res.json())
        console.log(data)   
    }
    return(
        <div className={styles.container}>
          <form>
            <input
                type='textarea' 
                onChange={e => setDescription(e.target.value)}
            />
            <button onClick={onSendNegociation}>Send negociation</button>
        </form>
      </div>
    )
    
}