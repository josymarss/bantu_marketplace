import {useRouter} from 'next/router';
import {useState,useEffect} from 'react';
import {ConnectToDatabase} from '../../db/connection';
import axios from 'axios'
import styles from './listingapps.module.css';

import HeadComponent from '../Head';
import App from './app';

export default function Apps({apps}){
      const router = useRouter();

      const [myId,setId] = useState();
      const [controlText, setText]= useState('');

      useEffect(()=>{

      },[controlText]);

      useEffect(() => setId(sessionStorage.getItem('tokenId')),[]);

      async function onSearch (){
            const result = await axios.post('/api/search/search',{
                  controlText
            });
            console.log(result);
            if(result){
                  router.push(`/search/${result}`);
            } 
      }
      return(
      <>
            <HeadComponent title='Aplicativos'/>
            <div className={styles.container}>
                  <div className={styles.searchContainer}>
                        <input 
                              type='text' 
                              name='search'
                              placeholder='Pesquisa por uma aplicativo'
                              className={styles.input}
                              onChange={e => setText(e.target.value)}
                        />
                        <button onClick={onSearch}>Buscar</button>
                  </div>
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
      return {
            props:{
                  apps
            }
      }
}