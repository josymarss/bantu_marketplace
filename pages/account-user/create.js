import {useState,useEffect} from 'react'
import { UseRouter } from 'next/router'

import styles from './createaccount.module.css'

export default function Create(){
    
    const [name,setName] = useState('')
    const [province,setProvince] = useState('')
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
        if(name == '' || pass == '' || confirmPass == '' || pass != confirmPass || description == '' || province == ''){
            alert('as palavras passes devem ser iguais e nenhum campo deve estar vazio')
        }else{
            const router = useRouter()
            const userCreated = await fetch(`${process.env.END_POINT}/account/createaccount`, {
                method: 'POST',
                headers:{'Content-Type':'application/json','Accept': 'application/json'},
                body: JSON.stringify(
                    {name,avatar,phone,province,description,apps:[],followers:[], password}
                )
            }).then(res => res.json())
            if(userCreated){
                const { _id } = userCreated
            }
            
             
        }
    }

    return(
        <div className={styles.container}>
            <form>
                <img src={href} className={styles.image}/>
                <input type='file' 
                        name='image' 
                        className={styles.btnLoad} 
                        onChange={loadImage}
                />
                <input 
                    type='text' 
                    name='username' 
                    onChange={e => setName(e.target.value)}
                />
                <input 
                    type='text' 
                    name='phone' 
                    onChange={e => setPhone(e.target.value)}
                />
                <input 
                    type='text' 
                    name='province' 
                    onChange={e => setProvince(e.target.value)}
                />
                <input 
                    type='text' 
                    name='description' 
                    onChange={e => setDescription(e.target.value)}
                />
                <input 
                    type='password' 
                    name='password' 
                    onChange={e => setPass(e.target.value)}
                />
                <input 
                    type='password' 
                    name='confirmpass' 
                    onChange={e => setConfirmPass(e.target.value)}
                />
                <button onClick={onCreateAccount}>Criar conta</button>
            </form>
        </div>
    )
}
