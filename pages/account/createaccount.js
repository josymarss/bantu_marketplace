import {useState,useEffect} from 'react'
import Link from 'next/link'
import { UseRouter } from 'next/router'

import styles from './createaccount.module.css'
import { db } from '../../db/connection'

export default function CreateAccount(){
    
    const [name,setName] = useState('')
    const [province,setProvince] = useState('')
    const [description,setDescription] = useState('')
    const [pass,setPass] = useState('')
    const [confirmPass,setConfirmPass] = useState('')
    const [phone,setPhone] = useState('')
    const [href, setHref] = useState('')

    const loadImage = (e) => {
        setHref(URL.createObjectURL(e.target.files[0]))
    }

    const OnCreateAccount =(e) =>{
        e.preventDefault()
        if(name == '' || pass == '' || confirmPass == '' || pass != confirmPass || description != '' || province != ''){
            alert('as palavras passes devem ser iguais e nenhum campo deve estar vazio')
        }else{
            const user = {
                name,
                avatar,
                phone,
                province,
                description,
                apps:[],
                followers:[],
                password:pass  
            }
            const router = useRouter()
            console.log(router)
            router.push({
                pathname:'/api/account/createaccount',
                query:{user}
            })
        }
    }

    return(
        <div className='container'>
            <img src={href} className={styles.image}/>
            <input type='flie' name='image' className={styles.btnLoad} onChange={loadImage}/>
            <input 
                type='text' 
                name='username' 
                onChange={e => setName(e.target.value)}
                required
            />
            <input 
                type='text' 
                name='phone' 
                onChange={e => setPhone(e.target.value)}
                required
            />
            <input 
                type='text' 
                name='province' 
                onChange={e => setProvince(e.target.value)}
                required
            />
            <input 
                type='text' 
                name='description' 
                onChange={e => setDescription(e.target.value)}
                required
            />
            <input 
                type='password' 
                name='password' 
                onChange={e => setPass(e.target.value)}
                required
            />
            <input 
                type='password' 
                name='confirmpass' 
                onChange={e => setConfirmPass(e.target.value)}
                required
            />
            
            <button onClick={OnCreateAccount}>Criar conta</button>
        </div>
    )
}