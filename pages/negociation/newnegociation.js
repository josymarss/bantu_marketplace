import { useState,useEffect } from 'react'
import Cookies from 'js-cookies'
import axios from 'axios'

import styles from './index.module.css'

export default function NewNegociation({ nameApp, idUser, idUserOfApp }){

    const [negociation, updateNegociation] = useState('')
    const [myId, updateMyId] = useState('')

    useEffect(() => { myId = Cookies.get('tokenId')})

    return(
        <div className={styles.container}>
            <input type='textarea' onChange={updateNegociation}/>
            <div className={styles.send}>
                <button onClick={axios.post('/api/admin/appstoacept',{
                    negociation,
                    nameApp,
                    idUser,
                    idUserOfApp
                })}>
                    Enviar
                </button>
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {

    const { nameApp, idUser, idUserOfApp } = context.query

    return {
        props:{
            nameApp, 
            idUser, 
            idUserOfApp
        }
    }
}