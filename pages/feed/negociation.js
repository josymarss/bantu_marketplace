import {useState} from 'react'

import styles from './negociation.module.css'

export default function Negociation(){

    const [description, setDescription] = useState('')
    
    const onSendNegociation = async (e) =>{
        e.preventDefault()
        console.log(description)
        const data = await fetch(`${process.env.END_POINT}/negociation/new`,{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({description})
        }).then(res => res.json())
        console.log(data)   
    }
    return(
        <div className={styles.container}>
            <input
                type='textarea' 
                placeholder='escreve sobre o que deseja negociar'
                onChange={e => setDescription(e.target.value)}
            />
            <button onClick={onSendNegociation}>Enviar</button>
      </div>
    )
    
}