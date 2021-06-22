import {useState,useEffect} from 'react'
import { useRouter } from 'next/router'

import styles from './create.module.css'

export default function Create(){
    const provinces = ['Bengo', 'Benguela','Bié','Cabinda','Cuando-Cubango','Kwanza norte','Kwanza sul','Cunene','Huambo','Huíla','Luanda','Lunda norte','Lunda sul','Malange','Muxico','Namibe','Uíge','Zaire']
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
        if(name == '' || password == '' || confirmPass == '' || password !== confirmPass || description == '' || province == ''){
            alert('as palavras passes devem ser iguais e nenhum campo deve estar vazio')
        }else{
            // const router = useRouter()
            const userCreated = await fetch(`/api/account/createaccount`, {
                method: 'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(
                    {
                        name,
                        href,
                        phone,
                        province,
                        description,
                        apps:[],
                        followers:[], 
                        password
                    })
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
                            filename='escolher foto' 
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
                        name='confirmpassword' 
                        placeholder='confirmar palavra passe'
                        onChange={e => setConfirmPass(e.target.value)}
                    />
                     <select
                        name='provincias'
                        value='província'
                        className={styles.province}
                    >
                        {provinces.map( province => {
                             <option 
                                 value={province} 
                                 Key={province}>{province}
                            </option>
                        })}
                    </select>
                    <button onClick={onCreateAccount}>Criar conta</button>
            </div>
        </div>
    )
}
