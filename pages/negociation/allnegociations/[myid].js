import {useState,useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';


import { ConnectToDatabase } from "../../../db/connection";
import styles from './allnegociations.module.css';

export default function AllNegotiations({ myApps, noti }){
      const router = useRouter();

      useEffect(() => {
      },[router.isReady]);

      const onSeeAllfromThisApp = async () =>{

      }
      
      const AppContent = ({ appname,description,appphoto,length,idapp,nameuser,idUser }) =>(
            <div className={styles.appcontainer}>
                  <div className={styles.acept}>
                        <div className={styles.appsection}>
                              <img src={appphoto?'/appfiles/'+appphoto:''} />
                              <p>{appname?appname:''}</p>
                        </div>
                        <div className={styles.buttons}>
                              <button className={styles.acepted} ><Link href={`/negociation/decide/${idapp}`}>Ver todas</Link></button>
                              <p className={styles.total}>{`1 de ${length?length:''}`}</p>
                        </div>
                  </div>
                  
                  <div className={styles.negociations}>
                        <p><span onClick={()=> router.push('/profile/'+idUser)}>{`@${nameuser}`}</span> diz:</p>
                        <div className={styles.content}>
                              <p className={styles.description}>
                                    {description? description.substring(0,40)+'...':''}
                              </p>
                             
                        </div>
                  </div>
            </div>
      );

      return(
            <div className={styles.container}>
                  <div className={styles.elements}>
                        <h3>Minhas negociações</h3>
                        {myApps.length != 0 ? myApps.map(app => 
                              app.negociations.length>0 ?
                              <AppContent 
                                    appname={app.name}
                                    description={app.negociations[0].description}
                                    appphoto={app.avatar}
                                    length={app.negociations.length}
                                    idapp={app._id?app._id:''}
                                    nameuser = {app.negociations[0].nameuser}
                                    idUser = {app.negociations[0].idUser}
                              />:''
                        )
                        :'Seus aplicativos não foram negociados'}
                  </div>
                  <h3>Notificações recentes</h3>
                  <div className={styles.notifications}>
                       {/* {noti.length > 0 ?
                              noti.map(not =><>
                                    <p>{not.appname}</p>
                                    <p>{not.not}</p>      
                              </>)
                              : <p>Sem notificações</p>
                       } */}
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

      let noti = await db.collection('notification').find({userId:id}).toArray();
      noti = JSON.parse(JSON.stringify(noti));
      return {
            props:{
                  myApps,
                  noti
            }
      }

}