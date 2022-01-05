import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import styles from './newapp.module.css';

export default function NewApp (){
    const router = useRouter();
    const [name, updateName] = useState('');
    const [description, updateDescription] = useState('');
    const [link, updateLink] = useState('');
    const [href, updateHref] = useState('');
    const [myId, updateMyId] = useState('');
    const [percentMax, setPercentMax] = useState('');
    const [percentMin, setPercentMin] = useState('');
    const [categoria, setCategoria] = useState('');
    const [startUp, setStartUp] = useState('');
    
    useEffect(() => {
        updateMyId(sessionStorage.getItem('tokenId'))
    },[router.isReady]);

    const onLoad = (e) => {
        updateHref(e.target.files[0]);
    }
    const addApp = async (e) => {
        e.preventDefault();
        if(name && description && link && href && percent){
            const formData = new FormData();
            formData.append('name',name);
            formData.append('description',description);
            formData.append('link',link);
            formData.append('file',href);
            formData.append('percentMin',percentMin);
            formData.append('percentMax',percentMax);
            formData.append('myId',myId);
            formData.append('categoria',categoria);
            
            const result = await axios.post('/api/apps/newapp',formData);

            toast.success("Aplicativo criado com sucesso!",{
                theme: "dark",
                delay:1000
            });

            setTimeout(()=>{
                router.push(`/profile/${myId}`);
            },3000);

            return 
        }else {
            toast.info("Algum erro ocorreu!",{
                theme: "dark"
            });
        }     
    } 
    //Valor das acoes
    const dataValuesActions = [];
    for(let j =1; j<=100; j++){
        dataValuesActions.push(j);
    }
                                    
    return (
        <div className={styles.container}>
            <img className={styles.img} src='/addnewapp.png' /> 
            <div className={styles.division}>
               
                   
                    <div className={styles.image}>
                        <img src={ href ? href : '/camera.png'}/>
                        <input type='file' className={styles.input} onChange={onLoad} />
                    </div>
                    <div className={styles.inputText}>
                        <input type='text' className={styles.input} placeholder='Nome do aplicativo' onChange={e => updateName(e.target.value)}/>
                        <p className={styles.label}>Adiciona uma categoria para o aplicativo</p>
                        <select className={styles.input}>
                            <option onChange={(e) => setCategoria(e.target.value)}>Bate-papo ou chat</option>
                            <option onChange={(e) => setCategoria(e.target.value)}>Serviços</option>
                            <option onChange={(e) => setCategoria(e.target.value)}>Informações</option>
                            <option onChange={(e) => setCategoria(e.target.value)}>Comunicação</option>
                            <option onChange={(e) => setCategoria(e.target.value)}>Mídia Social</option>
                            <option onChange={(e) => setCategoria(e.target.value)}>Navegador web</option>
                            <option onChange={(e) => setCategoria(e.target.value)}>Correio eletrônico</option>
                            <option onChange={(e) => setCategoria(e.target.value)}>Desenvolvimento de aplicações</option>
                            <option onChange={(e) => setCategoria(e.target.value)}>Telefonia e videoconferência</option>
                            <option onChange={(e) => setCategoria(e.target.value)}>Desenho industrial, 3D ou edição</option>
                            <option onChange={(e) => setCategoria(e.target.value)}>Administração Pública e de Processo eletrônico</option>
                        </select>
                        <p className={styles.label}>Escolha a quantidade de ações que deseja negociar</p>
                        <p className={styles.labelAnother}>Valor mínimo</p>
                        <select className={styles.input}>
                            {dataValuesActions.map(value =>
                                <option onChange={(e) => setPercentMin(e.target.value)}>{value+'%'}</option>
                            )}
                        </select>
                        <p className={styles.labelAnother}>Valor máximo</p>
                        <select className={styles.input}>
                            {dataValuesActions.map(value =>
                                <option onChange={(e) => setPercentMax(e.target.value)}>{value+'%'}</option>
                            )}
                        </select>
                        <input type='textarea' className={styles.description} placeholder='Descrição do aplicativo' onChange={e => updateDescription(e.target.value)}/>
                        <input type='text' className={styles.input} placeholder='Link do site, ou uma rede social' onChange={e => updateLink(e.target.value)} />
                        <input type='text' className={styles.input} placeholder='Start up/Empresa criadora' onChange={e => setStartUp(e.target.value)} />
                    </div>
                    <button className={styles.button} onClick={addApp}>
                        Criar 
                    </button>
               
            </div>
        </div>
    );
} 

