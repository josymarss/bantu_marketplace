import {useState} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'

export default function Login(){

    const [phone, setPhone] = useState('')
    const [password, setPass] = useState('')

    const onLogin = (e) =>{
        e.preentDefault()
        const router = useRouter()
        //search on database
        //login
        // if(user){
        //     router.push('/feed/feed')
        // }
    }
    return(
        <div className='container'>
            <input 
                type='text'
                name='phone'
                onChange={e => setNumber(e.target.value)}
                required 
            />
            <input 
                type='text'
                name='password'
                onChange={e => setPss(e.target.value)}
                required 
            />
            <button onClick={onLogin}>Entrar</button>
        </div>
    )
}