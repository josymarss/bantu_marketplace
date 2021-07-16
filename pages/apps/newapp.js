import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import axios from 'axios'

import styles from './newapp.module.css'

export default function NewApp () {
    
    const [name, updateName] = useState('')
    const [description, updateDescription] = useState('')
    const [link, updateLink] = useState('')
    const [href, updateHref] = useState('')
    const [myId, updateMyId] = useState()
    
    //useEffect(() => updateMyId(Cookies.get('tokenId')) )
    const onCreate = () => {

        axios.post('/api/admin/appstoacept',{
            name,
            description,
            link,
            reactions:{
                users:[],
                likes:0
            },
            photo:href,
            negociations:[],
            myId
        })
           
    }
    const onLoad = (e) => {
        updateHref(URL.createObjectURL(e.target.files[0]))
    }

    return (
        <div className={styles.container}>
            <h2>Fazer upload dos dados de um aplicativo</h2>
            <div className={styles.image}>
                <img href={ href ? href : '/camera.png'}/>
                <input type='file' className={styles.input} onChange={onLoad} />
            </div>
            <div className={styles.inputText}>
                <input type='text' className={styles.input} placeholder='Nome do aplicativo' onChange={e => updateName(e.target.value)}/>
                <input type='text' className={styles.input} placeholder='descrição' onChange={e => updateLink(e.target.value)}/>
                <input type='text' className={styles.input} placeholder='Link de uma mídea social' onChange={e => updateDescription(e.target.value)} />
            </div>
            <button className={styles.button} onClick={onCreate}>
                Criar 
            </button>
            
        </div>
    )
} 

