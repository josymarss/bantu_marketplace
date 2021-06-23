import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'

import styles from './login.module.css'

export default function Login(){

    const router = useRouter()
    const [phone, setPhone] = useState('')
    const [password, setPass] = useState('')

    const onLogin = async (event) => {
        event.preventDefault()
        const data = await axios.post(`/api/account/login`,{
            phone,
            password
        })

        const { tokenId, message } = data
        
        if(tokenId){
            router.push({
                pathname:'/profile/[id]',
                query:{ id: tokenId }
            })
        }else {
            return (<p>{ message }</p>)
        }
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
                    type='tel'
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