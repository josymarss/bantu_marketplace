import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import styles from './newapp.module.css';

export default function NewApp (){
    const router = useRouter();
    const [name, updateName] = useState('');
    const [description, updateDescription] = useState('');
    const [link, updateLink] = useState('');
    const [href, updateHref] = useState('');
    const [myId, updateMyId] = useState('');
    
    useEffect(() => updateMyId(sessionStorage.getItem('tokenId')) );

    const onLoad = (e) => {
        updateHref(URL.createObjectURL(e.target.files[0]))
    }
    const addApp = async () => {
        const result = await axios.post('/api/apps/newapp',{
            name,
            description,
            link,
            stars:{
                usersid:[],
                likes:0
            },
            photo:href,
            negociations:[],
            myId
        });
        if(result){
            router.push(`/profile/${myId}`);
        } 
    }
    return (
        <div className={styles.container}>
             <img className={styles.img} src='/addnewapp.png' /> 
            <div className={styles.division}>
                <h2>Fazer upload dos dados de um aplicativo</h2>
                <div className={styles.image}>
                    <img href={ href ? href : '/camera.png'}/>
                    <input type='file' className={styles.input} onChange={onLoad} />
                </div>
                <div className={styles.inputText}>
                    <input type='text' className={styles.input} placeholder='Nome do aplicativo' onChange={e => updateName(e.target.value)}/>
                    <input type='text' className={styles.input} placeholder='descrição' onChange={e => updateDescription(e.target.value)}/>
                    <input type='text' className={styles.input} placeholder='Link de uma mídea social' onChange={e => updateLink(e.target.value)} />
                </div>
                <button className={styles.button} onClick={addApp}>
                    Criar 
                </button>
            </div>
        </div>
    )
} 

