import {useState,useEffect} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {ObjectId} from 'mongodb';
import swl from 'sweetalert';
import styles from './decide.module.css';
import { ConnectToDatabase } from '../../../db/connection';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,faPenSquare,faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Acept({ negociation }){
      const [myId, setId] = useState();
      const router = useRouter();
      const [negociatiion, setNegociatiion] = useState(negociation.negociations);

      useEffect(() =>{
            setId(sessionStorage.getItem('tokenId'));
      },[router.isReady]);

      const onAceitar = async ()=>{
            swl({
                  title:'Aceitar',
                  text:`Tens a certeza que deseja aceitar
                  a soliciatção de: ${negociatiion.nameuser}`,
                  icon:'warning',
                  buttons:['Não', 'Sim'],

            }).then(async response => {
                  if (response) {
                        const result = await axios.post('/api/negociation/status',{
                              negociatiion,
                              myId
                        });
                        result.data? swl({
                              text:'Aceitado com sucesso, redirecionando...',
                              icon:'success'
                        }) : swl({
                              text:'Algum erro ocorreu, redirecionando...',
                              icon:'error'
                  })
                  setTimeout(() => router.push('/profile/'+myId) ,4000);
            }});
      }

       const onRejeitar = async ()  => {
            swl({
                  title:'Rejeitar',
                  text:`Tens a certeza que deseja rejeitar
                  a soliciatção de: ${negociatiion.nameuser}`,
                  icon:'warning',
                  buttons:['Não', 'Sim'],

            }).then(async response => {
                  if (response) {
                        const result = await axios.delete('/api/negociation/status',{
                              idaapp:app._id,
                              negociatiion,
                              myId
                        });
                        result.data ? swl({
                              text:'Eliminado com sucesso, redirecionando...',
                              icon:'success'
                        }): ''
                  } 
                  setTimeout(() => router.push('/prodile/'+myId) ,4000);
            });
            //chama o axios e rejeita o app
      }
      
      const AppComponent = () => (
            <div className={styles.appcontent}>
                  <p className={styles.appname}>{negociatiion[0].appname}</p>
                  
                        <div className={styles.negociations}>
                              <div className={styles.userdata}>
                                    <img src={negociatiion[0].useravatar ? '/uploads/'+negociatiion[0].useravatar : ''} /> 
                                    <p onClick={() => router.push('/profile/'+negociatiion[0].idUser)}>{negociatiion[0].nameuser?'@'+negociatiion[0].nameuser:''}</p>
                              </div>
                              <div className={styles.situation}>
                                    <p className={styles.title}>{negociatiion[0].titulo}</p>
                                    <div className={styles.padre}>
                                          <div onClick={() => onAceitar()} className={styles.greendiv}><span><FontAwesomeIcon icon={faCheck}/> </span></div>
                                          <div onClick={() => router.push('/negociation/reajustar/'+negociatiion[0]._id)} className={styles.yellowdiv}><span><FontAwesomeIcon icon={faPenSquare}/> </span></div>
                                          <div onClick={() => onRejeitar()} className={styles.reddiv}><span><FontAwesomeIcon icon={faTrash}/> </span></div>
                                    </div>
                              </div>
                              <div className={styles.mynegociations}>
                                    <p>{negociatiion[0].description?negociatiion[0].description:''}</p>
                              </div>
                        </div>
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

      let negociation = await db.collection('apps')
            .findOne({ negociations: {$elemMatch:{ _id:ObjectId(id)}}});

      return {
            props:{
                  negociation:JSON.parse(JSON.stringify(negociation))
            }
      }
}