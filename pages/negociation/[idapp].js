import { useState,useEffect } from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import {ObjectId} from 'bson';
import {ConnectToDatabase} from '../../db/connection';

import styles from './newnegotiation.module.css';

export default function NewNegociation({ app, user }){
    const router = useRouter();
    const [titulo, setTitulo] = useState();
    const [description, setDescription] = useState();
    const [myId,setId] = useState();

    useEffect(() => {
       setId(sessionStorage.getItem('tokenId'));
    },[]);

    const onNegociar = async () => {
        const result = await axios.post('/api/negociation/new',{
           _id:app[0]._id,
            idUser:myId,
            titulo,
            description,
            status:false
        });
        if(result){
            router.push(`/negociation/allnegociations/${myId}`);
        }else {
            alert('algum erro ocorreu durante o envio, tente de novo!')
        }
    }

    return(
        <div className={styles.container}>
            <h2>Iniciar uma nova negociação</h2>
            <p>Negociar <span>{app[0].name}</span> de <span>@{user[0].name}</span></p>
            <div className={styles.negociation}>
                <input 
                    type='text' 
                    name='titulo' 
                    placeholder='Título' 
                    className={styles.title}
                    onChange={e => setTitulo(e.target.value)}
                />
                <textarea 
                    rows="14" cols="25"
                    name='descricao' 
                    placeholder='Descreva a negociação' 
                    className={styles.input}
                    onChange={e => setDescription(e.target.value)}
                ></textarea>
                <button onClick={onNegociar} className={styles.btnnegociar}>
                    Negociar
                </button>
                <p>Ao apertar negociar você se compromete em cumprir com os <span><Link href='/terms'>termos de uso</Link></span> da negociação </p>
            </div>
        </div>
    )
}

export async function getServerSideProps(context){
    const db = await ConnectToDatabase();
    const id = context.params.idapp;
    
    const dataapp = await db.collection('apps');
    const appdata = await dataapp.find({_id: new ObjectId(id)}).toArray();
    const app = JSON.parse(JSON.stringify(appdata));

    const userdata = await db.collection('users').find({_id:new ObjectId(app[0].userId)}).toArray();
    const user = JSON.parse(JSON.stringify(userdata));

    return {
        props:{
            app,
            user
        }
    }
}