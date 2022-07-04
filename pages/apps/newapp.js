import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Head from '../Head'
import styles from './newapp.module.css';

export default function NewApp (){
    const router = useRouter();
    const [name, updateName] = useState('');
    const [description, updateDescription] = useState('');
    const [link, updateLink] = useState('');
    const [href, updateHref] = useState('');
    const [myId, updateMyId] = useState('');
    const [percentMax, setPercentMax] = useState('100');
    const [percentMin, setPercentMin] = useState('5');
    const [categoria, setCategoria] = useState('Informações');
    const [startUp, setStartUp] = useState('');
    
    useEffect(() => {
        updateMyId(sessionStorage.getItem('tokenId'))
    },[router.isReady]);

    const onLoad = (e) => {
        updateHref(e.target.files[0]);
    }
    const addApp = async (e) => {
        e.preventDefault();
        if(name && description && link && href && percentMax && percentMin && categoria) {
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
            },2000);

            return 
        }else {
            toast.error("Algum erro ocorreu!",{
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
        <>
            <Head title={"Adicionar aplicativo"}/>
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
                            <select className={styles.input} onChange={(e) => setCategoria(e.target.value)}>
                                <option value='Bate-papo ou chat'>Bate-papo ou chat</option>
                                <option value='Servicos'>Serviço</option>
                                <option value='Informacoes'>Informações</option>
                                <option value='Comunicacao'>Comunicação</option>
                                <option value='Midia Social'>Mídia Social</option>
                                <option value='Navegador web'>Navegador web</option>
                                <option value='Correio eletronico'>Correio eletrônico</option>
                                <option value='Desenvolvimento de aplicacoes'>Desenvolvimento de aplicações</option>
                                <option value='Telefonia e videoconferencia'>Telefonia e videoconferência</option>
                                <option value='Desenho industrial, 3D ou edicao'>Desenho industrial, 3D ou edição</option>
                                <option value='Administracao publica e de Processo eletronico'>Administração Pública e de Processo eletrônico</option>
                            </select>
                            <p className={styles.label}>Escolha a quantidade de ações que deseja negociar</p>
                            <p className={styles.labelAnother}>Valor mínimo</p>
                            <select className={styles.input} onChange={(e) => setPercentMin(e.target.value)}>
                                {dataValuesActions.map(value =>
                                    <option value={value} >{value+'%'}</option>
                                )}
                            </select>
                            <p className={styles.labelAnother}>Valor máximo</p>
                            <select className={styles.input} onChange={(e) => setPercentMax(e.target.value)}>
                                {dataValuesActions.map(value =>
                                    <option value={value} >{value+'%'}</option>
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
        </>
    );
} 

