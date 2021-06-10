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
        <form>
            <div className={styles.container}>
                <input 
                    type='text'
                    name='phone'
                    onChange={e => setNumber(e.target.value)}
                    required 
                />
                <input 
                    type='text'
                    name='password'
                    onChange={e => setPass(e.target.value)}
                    required 
                />
                <button onClick={onLogin}>Entrar</button>
            </div>
        </form>
    )
}