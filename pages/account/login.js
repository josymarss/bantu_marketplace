import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import swl from 'sweetalert';
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
            swl({
                title:'Sucesso',
                icon:'success'
            });
            setTimeout(() => router.push(`/profile/${tokenId}`), 2000);
        }else {
            swl({
                title:'Erro',
                text:`Erro ao fazer login, 
                Verifica se o número está correcto e tem 9 dígitos
                verifica se a senha está correcta`,
                icon:'error'
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