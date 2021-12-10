import {useState,useEffect} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {ObjectId} from 'mongodb';
import swl from 'sweetalert';
import styles from './decide.module.css';
import { ConnectToDatabase } from '../../../db/connection';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,faPenSquare,faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Acept({ app }){
      const [myId, setId] = useState();
      const router = useRouter();

      useEffect(() =>{
            setId(sessionStorage.getItem('tokenId'));
      },[router.isReady]);

      const onAceitar = async (negociation)=>{
            swl({
                  title:'Aceitar',
                  text:`Tens a certeza que deseja aceitar
                  a soliciatção de: ${negociation.nameuser}`,
                  icon:'warning',
                  buttons:['Não', 'Sim'],

            }).then(async response => {
                  if (response) {
                        const result = await axios.post('/api/negociation/status',{
                              idapp:app._id,
                              negociation,
                              myId
                        });
                        result ? swl({
                              text:'Aceitado com sucesso, redirecionando...',
                              icon:'success'
                        }) : swl({
                              text:'Algum erro ocorreu, redirecionando...',
                              icon:'error'
                  })
                  setTimeout(() => router.reload(window.location.pathname) ,4000)
            }});
      }

       const  onRejeitar =async (negociation)=> {
            // const result = await axios.delete('/api/negociation/status',{
            //       idaapp:app._id,
            //       negociation,
            //       myId
            // });
            swl({
                  title:'Rejeitar',
                  text:`Tens a certeza que deseja rejeitar
                  a soliciatção de: ${negociation.nameuser}`,
                  icon:'warning',
                  buttons:['Não', 'Sim'],

            }).then(response => {
                  if (response) {
                        swl({
                              text:'Eliminado com sucesso, redirecionando...',
                              icon:'success'
                        });
                  } 
                  setTimeout(() => router.reload(window.location.pathname) ,4000)
            });
            //chama o axios e rejeita o app
            
      }
      const onEditar = async (negociation)=>{
            const result = await axios.put('/api/negociation/status',{
                  idaapp:app._id,
                  negociation,
                  myId
            });
      }
      
      const AppComponent = () => (
            <div className={styles.appcontent}>
                  <p className={styles.appname}>{app.name}</p>
                  
                        {app.negociations.map((neg,index) =>
                              <div className={styles.negociations} key={index}>
                                    <div className={styles.userdata}>
                                          <img src={neg.useravatar ? neg.useravatar : ''} /> 
                                          <p onClick={() => router.push('/profile/'+neg.idUser)}>{neg.nameuser?neg.nameuser:''}</p>
                                    </div>
                                    <div className={styles.situation}>
                                          <p className={styles.title}>{neg.titulo}</p>
                                          <div className={styles.padre}>
                                                <div onClick={() => onAceitar(neg)}className={styles.greendiv}><span><FontAwesomeIcon icon={faCheck}/> </span></div>
                                                <div onClick={() => onEditar(neg)}className={styles.yellowdiv}><span><FontAwesomeIcon icon={faPenSquare}/> </span></div>
                                                <div onClick={() => onRejeitar(neg)}className={styles.reddiv}><span><FontAwesomeIcon icon={faTrash}/> </span></div>
                                          </div>
                                    </div>
                                    <div className={styles.mynegociations}>
                                          <p>{neg.description?neg.description:''}</p>
                                    </div>
                              </div>
                        )}
                        
                        {/* Map all negociations */}
                        
                        
                 
            </div>
      )
      return(
            <div className={styles.container}>
                  <AppComponent />
            </div>
      );
}
//Listar apps para aceitar ou rejeitar feed
//eliminar ou add negociations no banco de dados para
//gerar pdf do mesmo
export const getServerSideProps = async (context) =>{
      const db = await ConnectToDatabase();
      const id = context.params.id;

      const cursor = await db.collection('apps').find({_id:new ObjectId(id)});
      let app = await cursor.toArray();
      app = app[0];

      return {
            props:{
                  app:JSON.parse(JSON.stringify(app))
            }
      }
}