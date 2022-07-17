import {useRouter} from 'next/router';
import {useState,useEffect} from 'react';
import {ConnectToDatabase} from '../../db/connection';
import axios from 'axios'
import styles from './listingapps.module.css';
import Tabs from '../../components/tabs/tabs';
import HeadComponent from '../Head';
import Launchapps from '../../components/launchapps/launchapps';

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
                  <HeadComponent title= "Aplicativos"/>
                  <div className={styles.container}>
                        <Tabs/>
                        <Launchapps apps = {apps}/>
                  </div>      
            </>
      );
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