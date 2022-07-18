import {useRouter} from 'next/router';
import {useState,useEffect, useContext} from 'react';
import {ConnectToDatabase} from '../../db/connection';
import styles from './listingapps.module.css';
import Tabs from '../../components/tabs/tabs';
import HeadComponent from '../Head';
import Launchapps from '../../components/launchapps/launchapps';
import Allapps from '../../components/allapps/allapps';
import { AppContext } from '../_app';

export default function Apps({ apps,categorias }){
      const {element} = useContext(AppContext);
      const router = useRouter();
      const [myId,setId] = useState();
      const [limit, setLimit] = useState(10);
      const [controlText, setText]= useState('');

      useEffect(()=>{

      },[limit]);

      useEffect(() => setId(sessionStorage.getItem('tokenId')),[]);

      async function onSearch (){
            
      }
  
      const AppsTolist = ()=>{
            switch(element){
                  case 1 : return (
                        <Allapps apps={apps} />
                  );
                  case 2 : return (<h1> {"Favoritos"}</h1>);
                  case 3 : return (<h1> {"Categorias"}</h1>);
                  case 4 : return (<h1> {"Em alta"}</h1>);
                  case 5 : return (
                        <Launchapps apps={apps}/>);

            }
      }
      
      return(
            <>
                  <HeadComponent title= "Aplicativos"/>
                  <div className={styles.container}>
                        <Tabs/>
                        <div className={styles.container_app}>
                              <AppsTolist/>
                        </div>
                  </div>      
            </>
      );
}

export async function getServerSideProps (context) {
      const db = await ConnectToDatabase();
      const app = await db.collection('apps');
      
      const dataapp = await app.find({}).toArray();
      
      // const dataapp = await app.find({}).toArray();
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