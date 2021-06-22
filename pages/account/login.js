import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import styles from './login.module.css'

export default function Login(){

    const router = useRouter()
    const [phone, setPhone] = useState('')
    const [password, setPass] = useState('')

    const onLogin = async (event) => {
        event.preventDefault()
        const data = await fetch(`/api/account/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                // 'Accept': 'application/json'
            },
            body: JSON.stringify({
                phone,
                password
            })
        }).then(res => res.json())
        console.log(data)
        //redirect to homepage/profile
        // router.push(`${myIdToken}`)
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
                
                <a onClick={onLogin}>Entrar</a>
                
            </div>
    )
}