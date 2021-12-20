import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import swl from 'sweetalert';
import axios from 'axios';
import styles from './newapp.module.css';

export default function NewApp (){
    const router = useRouter();
    const [name, updateName] = useState('');
    const [description, updateDescription] = useState('');
    const [link, updateLink] = useState('');
    const [href, updateHref] = useState('');
    const [myId, updateMyId] = useState('');
    const [percent, setPercent] = useState('');
    const [categoria, setCategoria] = useState('');
    
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
            formData.append('percent',percent);
            formData.append('myId',myId);
            formData.append('categoria',categoria);
            
            const result = await axios.post('/api/apps/newapp',formData);

            swl({
                title:'Sucesso!',
                text:'Aplicativo cadastrado com sucesso',
                icon:'success'
            });

            setTimeout(()=>{
                router.push(`/profile/${myId}`);
            },5000);
            return 
        }else {
            swl({
                title:'Algum erro aconteceu',
                text:`Certifica-se que todos campos foram preenchidos
                Carrega uma imagem de tamnho 1080 x 1080`,
                icon:'warning'
          });
        }
          
    } 

    return (
        <div className={styles.container}>
            <img className={styles.img} src='/addnewapp.png' /> 
            <div className={styles.division}>
               
                    <h2>Fazer upload dos dados de um aplicativo</h2>
                    <div className={styles.image}>
                        <img src={ href ? href : '/camera.png'}/>
                        <input type='file' className={styles.input} onChange={onLoad} />
                    </div>
                    <div className={styles.inputText}>
                        <input type='text' className={styles.input} placeholder='Nome do aplicativo' onChange={e => updateName(e.target.value)}/>
                        <input type='text' className={styles.input} placeholder='descrição' onChange={e => updateDescription(e.target.value)}/>
                        <input type='text' className={styles.input} placeholder='Link de uma mídea social' onChange={e => updateLink(e.target.value)} />
                        <input type='text' className={styles.input} placeholder='Quanto deseja negociar' onChange={e => setPercent(e.target.value)} />
                        <input type='text' className={styles.input} placeholder='Categoria em uma palavra' onChange={e => setCategoria(e.target.value)} />
                    </div>
                    <button className={styles.button} onClick={addApp}>
                        Criar 
                    </button>
               
            </div>
        </div>
    );
} 

