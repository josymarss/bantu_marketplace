import {useState,useEffect} from 'react';
import Link from 'next/link';

import { ConnectToDatabase } from "../../../db/connection";
import styles from './allnegociations.module.css';

export default function AllNegotiations({myApps}){

      useEffect(() => {},[]);

      const onSeeAllfromThisApp = async () =>{

      }
      const gotToprofile = async () => {

      }
      const onReadMore = async () =>{

      }

      const AppContent = ({ appname,description,appphoto,length,idapp }) =>(
            <div className={styles.appcontainer}>
                  <div className={styles.acept}>
                        <div className={styles.appsection}>
                              <img src={appphoto} />
                              <p>{appname}</p>
                        </div>
                        <div className={styles.buttons}>
                              <button className={styles.acepted} ><Link href={`/negociation/decide/${idapp}`}>Ver todas</Link></button>
                              <p className={styles.total}>{`1 de ${length}`}</p>
                        </div>
                  </div>
                  
                  <div className={styles.negociations}>
                        <p><span onClick={gotToprofile}>@fulano</span> diz:</p>
                        <div className={styles.content}>
                              <p className={styles.description}>
                                    {description.substring(0,40)+'...'}
                              </p>
                              <p className={styles.readmore} onClick={onReadMore}>Ler mais...</p>
                        </div>
                  </div>
            </div>
      );

      return(
            <div className={styles.container}>
                  <div className={styles.elements}>
                        <h3>Minhas negociações</h3>
                        {myApps.length != 0 ? myApps.map(app => 
                              <AppContent 
                                    appname={app.name}
                                    description={app.negociations[0].description}
                                    appphoto={app.avatar}
                                    length={app.negociations.length}
                                    idapp={app._id}
                              />
                        )
                        :'Seus aplicativos não foram negociados'}
                  </div>
                   
            </div>    
      );
}
export async function getServerSideProps(context) {
      const db = await ConnectToDatabase();
      const id = context.params.myid;
      const cursor = await db.collection('apps').find();
      //Procurar por negociaoes que solicitei
      const apps = await cursor.toArray();
     
      let myApps = apps.filter(app => app.userId == id );
      myApps = JSON.parse(JSON.stringify(myApps));

      return {
            props:{
                  myApps
            }
      }

}