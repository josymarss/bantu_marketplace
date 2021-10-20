import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import styles from './newapp.module.css'

export default function NewApp ({ id }) {
    const router = useRouter()
    const [name, updateName] = useState('')
    const [description, updateDescription] = useState('')
    const [link, updateLink] = useState('')
    const [href, updateHref] = useState('')
    const [myId, updateMyId] = useState('')
    
    useEffect(() => {
        updateMyId(id)
        // console.log(id)
        // const aux = router.query.id
        // console.log('aux na casa ', aux)
    },[])
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
        window.location
           
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

export const getServerSideProps = async (context)=>{
    const id = context.params.id
    // console.log('mostrando do server side',id)
    return {
        props:{
            id
        }
    }
}