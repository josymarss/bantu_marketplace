import { useState,useEffect } from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import {ObjectId} from 'bson';
import {ConnectToDatabase} from '../../db/connection';

import styles from './newnegotiation.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NewNegociation({ app, user }){
    const router = useRouter();
    const [titulo, setTitulo] = useState();
    const [description, setDescription] = useState();
    const [negotitationType,setNegType] = useState('Ações do Aplicativo');
    const [myId,setId] = useState();
    const [percent,setPercent] =useState(0);

    const [dia,setDia] = useState(new Date().getDate());

    const tryMonth = new Date().getMonth()+2;
    tryMonth > 12 ? tryMonth = 12 : '';
    const [mes,setMes] = useState(tryMonth);

    const [ano,setAno] = useState(new Date().getFullYear());

    const dataLimite = dia+'/'+mes+'/'+ano;

    useEffect(() => {
       setId(sessionStorage.getItem('tokenId'));
    },[]);

    const onNegociar = async () => {
        
        
        if(titulo&&description&&negotitationType!=null&& myId&&percent&&dataLimite){
            percent = percent.trim();
            if(percent.length>4){
                percent = percent[0] + percent[1] + percent[2] 
            }
            var existPercent = percent.indexOf('%');
            existPercent < 0 ? percent+='%' : '';  

            const result = await axios.post('/api/negociation/new',{
                _id:app[0]._id,
                appname:app[0].name,
                iduserdonodoapp:app[0].userId,
                idUser:myId,
                titulo,
                description,
                status:false,
                negotitationType,
                percent,
                dataLimite
            });
            if(result){
                router.push(`/negociation/allnegociations/${myId}`);
            }else {
                toast.error("Algum erro ocorreu, certifica-se que todos campos estãopreenchidos!",{
                    theme: "dark",
                });
            }
        }else{
            toast.error("Algum erro ocorreu, certifica-se que todos campos estãopreenchidos!",{
                theme: "dark",
            });
        }

    }

    return(
        <div className={styles.container}>
            <h2>Iniciar uma nova negociação</h2>
            <p className={styles.detail}>Negociar <span>{app[0].name}</span> de <span>@{user[0].name}</span></p>
            <div className={styles.negotiation}>
               {/* Inputs here */}
                <div className={styles.inputs}>
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
                </div>
                 {/* Data fields here */}
                <div className={styles.detailsNegotiations}>
                    <div className={styles.options}>
                        <p className={styles.title}>Data limite</p>
                        <div className={styles.date}>
                            <p>Dia/Mês/Ano</p>
                            <input value={dia} type='text'onChange={(e) =>setDia(e.target.value)}/>
                            <input value={mes} type='text'onChange={(e) =>setMes(e.target.value)}/>
                            <input value={ano} type='text'onChange={(e) =>setAno(e.target.value)}/>
                        </div>
                       
                        <div className={styles.values}>
                            <p className={styles.title}>Ações desejadas por esta negociação</p>
                                <input 
                                    type='text' 
                                    placeholder='Valor das ações' 
                                    onChange={(e) =>setPercent(e.target.value)}
                                />
                        </div>
                        <div className={styles.values}>
                            <p className={styles.title}>Tipo de negociação</p>
                            <select className={styles.selectInput} onChange={e => setNegType(e.target.value)}>
                                <option value='Ações da empresa'>Ações da empresa</option>
                                <option value='Ações do Aplicativo'selected="selected">Ações do Aplicativo</option>
                                <option value='Compra do aplicativo'>Compra do aplicativo</option>
                                <option value='Lançamento do aplicativo'>Lançamento do aplicativo</option>
                            </select>
                            <div className={styles.actions}>
                                <p className={styles.title}>Selecionado:</p>
                                <p className={styles.another}>{negotitationType == null ? 'Selecione um acima': negotitationType}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <p>Ao apertar negociar você se compromete em cumprir com os <span><Link href='/terms'>termos de uso</Link></span> da negociação. </p>
        </div>
    )
}

export async function getServerSideProps(context){
    const db = await ConnectToDatabase();
    const id = context.params.idapp;
    
    const dataapp = await db.collection('apps');
    const appdata = await dataapp.find({_id:ObjectId(id)}).toArray();
    const app = JSON.parse(JSON.stringify(appdata));

    const userdata = await db.collection('users').find({_id:ObjectId(app[0].userId)}).toArray();
    const user = JSON.parse(JSON.stringify(userdata));

    return {
        props:{
            app,
            user
        }
    }
}