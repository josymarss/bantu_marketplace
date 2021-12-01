import {useState,useEffect} from 'react';

import { ConnectToDatabase } from "../../../db/connection";
import styles from './allnegociations.module.css';

export default function AllNegotiations({}){
      const [myId,setId] = useState();

      useEffect(() => {})
      return(
            <div className={styles.container}>
                  <div className={styles.negotiationsimade}>
                        <h2>Negociações que solicitei</h2>
                       
                  </div>
                  <div className={styles.negotiationsirecived}>
                        {/* Negociacoes dos meus aplicativos */}
                        {/* Aceitar / Rejeitar */}
                        <h2>Negociações solicitadas</h2>
                  </div>
            </div>    
      );
}
export async function getServerSideProps(context) {
      const db = await ConnectToDatabase();
      const id = context.params.myid;
      const apps = await db.collection('apps');
      //Procurar por negociaoes que solicitei
      
      const result = await apps.findOne({});
      const {negociations} = result;
      //Filter my negociations que
      const myNegociations = negociations.filter(nego => nego.idUser == id);
      return {
            props:{
                  myNegociations
            }
      }

}