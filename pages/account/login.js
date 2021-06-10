import { useState } from 'react'
import { useRouter } from 'next/router'

import styles from './login.module.css'

export default function Login(){

    const [phone, setPhone] = useState('')
    const [password, setPass] = useState('')

    const onLogin = (e) => {
        e.preentDefault()
        const router = useRouter()
        
    }
    return(
            <form className={styles.container}>
                <input 
                    type='text'
                    name='phone'
                    placeholder='phone'
                    onChange={e => setNumber(e.target.value)}
                />
                <input 
                    type='text'
                    name='password'
                    placeholder='password'
                    onChange={e => setPass(e.target.value)}
                />
                <button onClick={onLogin}>Entrar</button>
            </form>
    )
}