import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import styles from './login.module.css'

export default function Login(){

    const [phone, setPhone] = useState('')
    const [password, setPass] = useState('')

    const onLogin = async (e) => {
        e.preentDefault()
         // search on database 
         // to localstorage
        const router = useRouter()
        //redirect to homepage/profile
    }
    return(
            <div className={styles.input}>
                <h1>
                    Faca login ou 
                    <Link href='/account-user/create'>
                        <span> cria uma conta</span>
                    </Link>
                </h1>
                <input 
                    type='text'
                    name='phone'
                    placeholder='phone'
                    onChange={(e) => setPhone(e.target.value)}
                />
                <input 
                    type='password'
                    name='password'
                    placeholder='password'
                    onChange={(e) => setPass(e.target.value)}
                />
                <button onClick={onLogin}>Entrar</button>
            </div>
    )
}