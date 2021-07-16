import {useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import styles from './create.module.css'
import Error from '../error/error'

export default function Create(){
    const router = useRouter()
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [password,setPass] = useState('')
    const [confirmPass,setConfirmPass] = useState('')
    const [phone,setPhone] = useState('')
    const [href, setHref] = useState('')

    const loadImage = (e) => {
        setHref(URL.createObjectURL(e.target.files[0]))
    }

    async function onCreateAccount(e){
        e.preventDefault()
        const result = await axios.post('/api/account/create', {
            name,
            photo:href,
            phone,
            description,
            apps:[],
            followers:[], 
            password, 
            feed:[]
        })
        
        const { tokenId } = result.data
        router.push(`/profile/${tokenId}`)
        
          
    }
    return(
        <div className={styles.container}>
            <img 
                src={href === '' ? '/camera.png' : href }  className={styles.imageContainer}
            />
            <div className={styles.myForm}>
                <input 
                    type='file' 
                    name='image'
                    // filename='escolher foto' 
                    className={styles.btnLoad} 
                    onChange={loadImage}
                />
                <input 
                    type='text' 
                    name='username'
                    placeholder='nome de usuário'
                    onChange={e => setName(e.target.value)}
                />
                <input 
                    type='tel' 
                    name='telefone'
                    placeholder='telefone'
                    onChange={e => setPhone(e.target.value)}
                />
                <input 
                    type='password' 
                    name='password'
                    placeholder='palavra passe'
                    onChange={e => setPass(e.target.value)}
                />
                <input 
                    type='password' 
                    name='confirmpassword' 
                    placeholder='confirmar palavra passe'
                    onChange={e => setConfirmPass(e.target.value)}
                />
                <input 
                    type='textarea' 
                    name='description'
                    placeholder='descrição sobre você' 
                    onChange={e => setDescription(e.target.value)}
                />
                <button onClick={onCreateAccount}>Criar conta</button>
            </div>
        </div>
    )
}
