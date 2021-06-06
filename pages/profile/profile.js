import {useState,useEffect} from 'react'
import {useRouter} from 'next/router'

import App from '../apps/app'
import styles from './profile.module.css' 

export default function Profile(){

    const onFollow = ()  => {
        console.log('seguindo')
    }
    const onSolicitar = () => {

    }

    return(
        <div>
        <div className={styles.container}>
            <div className={styles.profile}>
                <div className={styles.borderIamge}>
                    <img src='/favicon.ico'/>
                </div>
                <p className={styles.username}>@username</p>
                <p className={styles.descritpion}>description</p>
                <button onClick={onFollow}>Seguir</button>
            </div>
            <div className={styles.appSection}>
                <input type='text' name='procurar' ploaceholder='procurar um app'/>
                <div className={styles.connections}>
                    <p><span>Meus aplicativos</span></p>
                    <div className={styles.appSolicitar}>
                        <App width={22} height={22} name='Tupuca'/>
                        <button onClick={onSolicitar}>Solicitar</button>
                    </div>
                </div>
                <div className={styles.negociations}>
                    <p><span>solicitações de negociações</span></p>
                    <div className={styles.solicitation}>
                        <App width={22} height={22} name='Tupuca'/>
                        <div className={styles.solicitationsButton}>
                             <button className={styles.aceitar}><span>Aceitar</span></button>
                             <button className={styles.btnBusiness}>Editar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}