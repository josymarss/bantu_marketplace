import {useState,useEffect} from 'react'
import {useRouter} from 'next/router'

import App from '../apps/app'
import styles from '../../styles/profile.module.css' 

export default function Profile(){
    return(
        <>
        <button className={styles.buttonAdd}>+</button>
        <div className={styles.container}>
            <div className={styles.profile}>
                <div className={styles.userAndPhoto}>
                    <div>
                        <img src='/favicon.ico'/>
                    </div>
                    <p className={styles.username}>@username</p>
                    <p className={styles.descritpion}>description</p>
                </div>
            </div>
            <div className={styles.appSection}>
                <div className={styles.connections}>
                    <p><span>Connections</span></p>
                    <App width={22} height={22} name='Tupuca'/>
                </div>
                <div className={styles.negociations}>
                    <p><span>Negocitations</span></p>
                    <App width={22} height={22} name='Tupuca'/>
                </div>
            </div>
        </div>
        </>
    )
}