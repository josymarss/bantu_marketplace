import {useState,useEffect,Fragment} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
// import {ObjectId} from 'mongodb';
import { ConnectToDatabase } from "../../../db/connection";
import Head from '../../Head'
import styles from './allnegociations.module.css';

export default function AllNegotiations({ myNegs, noti }){
      const router = useRouter();

      useEffect(() => {
      },[router.isReady]);

      const onSeeAllfromThisApp = async () =>{

      }

      return(
            <>    <Head title={'Notificações'}/>
                  <div className={styles.container}>
                        <div className={styles.elements}>
                              <h3>Minhas negociações</h3>
                              {myNegs.length > 0 ? myNegs.map(neg => 
                                    <Fragment>
                                          <div className={styles.dataapp}>
                                                <div className={styles.user}>
                                                      <img className={styles.img} src={`/uploads/${neg.usersolicitanteavatar}`} />
                                                      <p>{neg.idusersolicitantename}</p>
                                                </div>
                                                <h4 >{neg.appname}</h4>
                                                <p><span>Tipo: </span>{neg.titulo}</p>
                                                <p><span>Percentual: </span>{neg.percent}</p>
                                                <p><span>Data limite: </span>{neg.dataLimite}</p>
                                                <button onClick={() => router.push('/negociation/decide/'+neg._id)}>Ver detalhes</button>
                                          </div>
                                    </Fragment>) 
                                          
                                    : <p>Sem negociações por enquanto</p>
                              }
                              
                        </div>
                        
                  </div>  
            </>  
      );
}
export async function getServerSideProps(context) {
      const db = await ConnectToDatabase();
      const negotiation = await db.collection('negotiation');
      const id = context.params.myid;
      const cursor = await db.collection('apps').find();
      //Procurar por negociaoes que solicitei
      const apps = await cursor.toArray();
     
      let myApps = []
      // let myNegs = []

      let negoctiations = await negotiation.find({}).toArray();
      let myNegs = negoctiations.filter(neg => neg.iduserdonodoapp == id); 

      myApps = JSON.parse(JSON.stringify(myApps));

      let noti = await db.collection('notification').find({userId:id}).toArray();
      noti = JSON.parse(JSON.stringify(noti));

      return {
            props:{
                  myNegs:JSON.parse(JSON.stringify(myNegs)),
                  noti
            }
      }

}