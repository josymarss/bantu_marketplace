import {useState,useEffect,Fragment} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
// import {ObjectId} from 'mongodb';
import { ConnectToDatabase } from "../../../db/connection";
import Head from '../../Head'
import styles from './allnegociations.module.css';

export default function AllNegotiations({ myNegs, noti}){
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
                              {myNegs.length > 0 ? myNegs.map((neg, index) => 
                              
                                    <Fragment key={index}>
                                          <div className={styles.dataapp}>
                                          <p>{neg.negociations[0].appname}</p>
                                                <div className={styles.user}>
                                                      <img className={styles.img} src={`/uploads/${neg.negociations[0].usersolicitanteavatar}`} />
                                                      <p>{neg.negociations[0].idusersolicitantename}</p>
                                                </div>
                                                <h4 >{neg.negociations[0].appname}</h4>
                                                <p><span>Tipo: </span>{neg.negociations[0].titulo}</p>
                                                <p><span>Percentual: </span>{neg.negociations[0].percent}</p>
                                                <p><span>Data limite: </span>{neg.negociations[0].dataLimite}</p>
                                                <button onClick={() => router.push('/negociation/decide/'+neg.negociations[0]._id)}>Ver detalhes</button>
                                          </div>
                                       
                                          {/* {console.log(neg.negociations)} */}
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
      const apps = await db.collection('apps');
      const id = context.params.myid;

      let negoctiations= await apps.find({negociations: {$elemMatch: {iduserdonodoapp: id}} }).toArray();
      let myNegs = JSON.parse(JSON.stringify(negoctiations));

      return {
            props:{
                  myNegs,
                  // noti
            }
      }

}