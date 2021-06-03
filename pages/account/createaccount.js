import {useState,useEffect} from 'react'
import Link from 'next/link'
import { UseRouter } from 'next/router'

export default function CreateAccount(){
    
    const [name,setName] = useState('')
    const [pass,setPass] = useState('')
    const [confirmPass,setConfirmPass] = useState('')
    const [phone,setPhone] = useState('')

    const OnCreateAccount =(e) =>{
        e.preventDefault()

        //search on database user 
        //save on localStorage or cookie
        // if(user){
        //     const router = useRouter()
        //     router.push('/feed/feed')
        // }
    }

    return(
        <div className='container'>
            <input 
                type='text' 
                name='username' 
                onChange={e => setName(e.target.value)}
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
            <input 
                type='text' 
                name='phone' 
                onChange={e => setName(e.target.value)}
                required
            />
            <button onClick={OnCreateAccount}>Criar conta</button>
        </div>
    )
}