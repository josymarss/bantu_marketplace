import {useEffect,useState} from 'react';
import {useRouter} from 'next/router';
import swl from 'sweetalert';
import { ObjectId } from 'mongodb';
import {ConnectToDatabase} from '../../db/connection';
import styles from './id.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPen,faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function appDetails({ app }){
      const router = useRouter();
      const [name,setName] = useState();
      const [description,setDescription] = useState();
      const [link,setLink] = useState();
      const [href,setHref] = useState();
      const [percent,setPercent] = useState('');
      const [idapp,setIdap] = useState();
      const [categoria,setCategoria] = useState();
      const [myId,setId] = useState();


      useEffect(() => {
            setId(sessionStorage.getItem('tokenId'));
            setIdap(app._id);
      },[router.isReady]);
      const onChangeImage = (e) => setHref(e.target.files[0]);
      const onSave = (e) => {
            if(name&&description&&link&&href&&percent.length<=3&&idapp){
                  e.preventDefault();
                  const formData = new FormData();
                  let position = percent.search('%');
                  
                  if(position >= 0){
                        percent.replace('%','');
                        setPercent(percent+'%');                  }
                  console.log(percent);

                  formData.append('name',name);
                  formData.append('description',description);
                  formData.append('link',link);
                  formData.append('file',href);
                  formData.append('percent',percent);
                  formData.append('idapp',idapp);
                  formData.append('categoria',categoria);
                  
                  axios.put('/api/apps/newapp',formData);

                  swl({
                        title:'Actualizado',
                        text:'Aplicativo actualizado com sucesso',
                        icon:'success'
                  });
                  setTimeout(()=>{
                        router.push(`/profile/${myId}`);
                  },3000);

                  return
            }
            swl({
                  title:'Algum erro aconteceu',
                  text:`Certifica-se que todos os campos estão preenchidos
                  o símbolo "%", percentagem será adicionada automaticamente
                  Percentagem vai de 0 á 100`,
                  icon:'warning'
            });
            
      }
      const onDelete = () => {
            swl({
                  title:'Apagar aplicativo',
                  text:`Tens a certeza que deseja Apagar este aplicativo`,
                  icon:'warning',
                  buttons:['Não', 'Sim'],

            }).then(async response => {
                  if (response) {
                        const result = await axios.post('/api/apps/delete',{id:app._id});
                        if(result){
                              setTimeout(() => router.push('/profile/'+myId),3000);
                        }
                  }
            });
      }
      return (
            <div className={styles.container}>
                   
                        <div className={styles.header}>
                              <img className={styles.img} src ={'/appfiles/'+app.avatar}/>
                           
                              <div className={styles.block}>
                                    <p>{app.name}</p>
                                    <span>
                                          <a target='_blank'href='https://www.facebook.com' rel="noopener noreferrer">
                                                {app.link? app.link.substring(0,50) : 'Aplicativo não tem um link do site' } 
                                          </a>
                                    </span>
                                    <div className={styles.contentapp}>
                                          <p>
                                                <FontAwesomeIcon icon={faStar} /><span>{app.stars.likes}</span> 
                                          </p>
                                          <p>
                                               Negociações  <span>{app.negociations.length} </span>
                                          </p>
                                          <p>
                                               Valor disponível <span>{app.percent ? app.percent+'%' : '100%' } </span>
                                          </p>
                                    </div>
                              </div>
                             
                        </div> 
                        <div className={styles.desc}>
                              <p>{app.description}</p>
                        </div>
                        <div className={styles.inputandedit}>
                              
                              {myId == app.userId ?
                              <div className={styles.aliginEdit}>
                                    <div className={styles.inputs}>
                                          <input type='file' onChange={onChangeImage} />
                                          <input type='text' onChange={(e) => setName(e.target.value)} placeholder='Nome do aplicativo' className={myId != app.userId ? styles.disabled : ''}/>
                                          <input type='text' onChange={(e) => setDescription(e.target.value)} placeholder='Descrição' className={myId != app.userId ? styles.disabled : ''}/>
                                          <input type='text' onChange={(e) => setLink(e.target.value)}placeholder='Link do aplicativo' className={myId != app.userId ? styles.disabled : ''}/>
                                          <input type='text' onChange={(e) => setPercent(e.target.value)} placeholder='Percentam que deseja negociar' className={myId != app.userId ? styles.disabled : ''}/>
                                          <input type='text' onChange={(e) => setCategoria(e.target.value)} placeholder='Categoria, em uma palavra' className={myId != app.userId ? styles.disabled : ''}/>
                                    </div>
                                    <div className={styles.penedit}>
                                          <p>Salvar edições</p>
                                          <span className={styles.icon} onClick={onSave}>
                                                <FontAwesomeIcon icon={faPen}/>
                                          </span>
                                          <p><span onClick={onDelete}className={styles.iconDelete}>
                                                <FontAwesomeIcon icon={faTrash}/>
                                          </span></p>
                                    </div>
                              </div>:''}
                        </div>
            </div>
      );
}

export async function getServerSideProps (context) {
      const db = await ConnectToDatabase();
      const id = context.params.id;
      const apps = await db.collection('apps').findOne({_id:ObjectId(id)});

      return {
            props:{
                  app:JSON.parse(JSON.stringify(apps))
            }
      }

}