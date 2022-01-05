import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import styles from './login.module.css'

export default function Login(){

    const router = useRouter();
    const [phone, setPhone] = useState('');
    const [password, setPass] = useState('');
    
    const onLogin = async (event) => {
        event.preventDefault();
        const result = await axios.post(`/api/account/login`,{
            phone,
            password
        });
        
        // const { tokenId, message, phone } = result.data
        const { tokenId } = result.data;

        if(tokenId){
            sessionStorage.setItem('tokenId',tokenId);
            toast.success("Sucesso!",{
                theme: "dark",
                delay:1000
            });
            
            setTimeout(() => router.push(`/profile/${tokenId}`), 3000);
        }else {
            toast.error("Algum erro ocorreu, certifica-se que todos campos estãopreenchidos!",{
                theme: "dark"
            });
        }
    }
    return(
        <div className={styles.general}>
            <img src='/crayon-waiting-2.png'/>
            <div className={styles.input}>
                <h1>
                    Autenticar 
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
                <button  onClick={onLogin}>Entrar</button>
            </div>
        <div className= {styles.criarConta}>
            <p> Ainda não tens uma conta?  
                <Link href='/account/create'>
                    <a className='semConta'> Clique aqui para criar</a>
                </Link>
            </p>
        </div>

    </div>
    );
}