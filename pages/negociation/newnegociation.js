import { useState,useEffect } from 'react'
import Router from 'next/router'
import axios from 'axios'

import styles from './index.module.css'

export default function NewNegociation({nameApp, idUser, idUserOfApp}){

    useEffect(() => {
       
    },[])

    return(
        <div className={styles.container}>
            <input type='textarea' onChange={updateNegociation}/>
            <div className={styles.send}>
                <button onClick={axios.post('/api/admin/negociation/new',{
                    negociation,
                    nameApp,
                    idUser,
                    idUserOfTheApp
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
            idUserOfTheApp
        }
    }
}