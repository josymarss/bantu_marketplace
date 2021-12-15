import {useRouter} from 'next/router';
import {useState,useEffect} from 'react';
import {ConnectToDatabase} from '../../db/connection';
import axios from 'axios'
import styles from './listingapps.module.css';

import HeadComponent from '../Head';
import App from './app';

export default function Apps({ apps,categorias }){
      const router = useRouter();

      const [myId,setId] = useState();
      const [limit, setLimit] = useState(10);
      const [controlText, setText]= useState('');

      useEffect(()=>{

      },[limit]);

      useEffect(() => setId(sessionStorage.getItem('tokenId')),[]);

      async function onSearch (){
            
      }
      return(
      <>
            <HeadComponent title='Aplicativos'/>
            <div className={styles.container}>
                  <p className={styles.categoryP}>Categorias de aplicativos</p>
                  <div className={styles.category}>
                        {categorias.length > 0 ?
                              categorias.map(category => 
                                    <button onClick={onSearch}>{category}</button>
                              ): ''
                        }
                  </div>
                  {categorias.length > 10 ? <p className={styles.seemore}>Ver mais...</p>:''}
                  <div className={styles.listingapps}>
                        {apps ? 
                              apps.map(app => <App application={app} userid={myId} />) 
                        : ''}
                  </div>
                 
            </div>
      </>)
}

export async function getServerSideProps (context) {
      const db = await ConnectToDatabase();
      const app = await db.collection('apps');
      
      const dataapp = await app.find({}).toArray();
      const apps = JSON.parse(JSON.stringify(dataapp));

      let categorias = [];
      apps.map(app => categorias.push(app.categoria));

      return {
            props:{
                  apps,
                  categorias
            }
      }
}