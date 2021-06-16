import {useState,useEffect} from 'react'
import { UseRouter } from 'next/router'

import styles from './create.module.css'

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
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(
                    {name,avatar,phone,province,description,apps:[],followers:[], password}
                )
            }).then(res => res.json())
            if(userCreated){
                const { token } = userCreated
            }
            
             
        }
    }

    return(
        <div className={styles.container}>
            <img src={href}/>
            <div className={styles.myForm}>
                    <input type='file' 
                            name='image' 
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
                        type='text' 
                        name='phone'
                        placeholder='telefone'
                        onChange={e => setPhone(e.target.value)}
                    />
                    <input 
                        type='text' 
                        name='province'
                        placeholder='província'
                        onChange={e => setProvince(e.target.value)}
                    />
                    <input 
                        type='text' 
                        name='description'
                        placeholder='descrição sobre você' 
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        type='password' 
                        name='password'
                        placeholder='palavra passe'
                        onChange={e => setPass(e.target.value)}
                    />
                    <input 
                        type='password' 
                        name='comfirmpassword' 
                        placeholder='comfirmar palavra passe'
                        onChange={e => setConfirmPass(e.target.value)}
                    />
                    <button onClick={onCreateAccount}>Criar conta</button>
            </div>
        </div>
    )
}
