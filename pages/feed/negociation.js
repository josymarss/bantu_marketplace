import {useState} from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import axios from 'axios'

import styles from './negociation.module.css'

export default function Negociation(){
    
    const router = useRouter()

    useEffect(() =>{
        myId = Cookies.get('tokenId')
    })

    const [description, setDescription] = useState('')
    
    const onSendNegociation = async (e) =>{
        e.preventDefault()
        const data = await axios.post(`/api/negociation/new`,{
            _id,
            description 
        })
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