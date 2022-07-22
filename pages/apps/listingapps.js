import {useRouter} from 'next/router';
import {useState,useEffect, useContext} from 'react';
import {ConnectToDatabase} from '../../db/connection';
import styles from './listingapps.module.css';
import Tabs from '../../components/tabs/tabs';
import HeadComponent from '../Head';
import Launchapps from '../../components/launchapps/launchapps';
import Allapps from '../../components/allapps/allapps';
import { AppContext } from '../_app';
import HighierApp from '../../components/higherApps/highierapps';
import FavouriteApp from '../../components/favourites/favouriteApp';
import Categoryapps from '../../components/category/categoryapps';

export default function Apps({ apps,category, appsSorted, appsHighier }){
      const {element} = useContext(AppContext);
      const [myId,setId] = useState();

      useEffect(() => setId(sessionStorage.getItem('tokenId')),[]);

      const AppsTolist = ()=>{
            switch(element){
                  case 1 : return (
                        <Allapps apps={apps} />
                  );
                  case 2 : return (<FavouriteApp myId={myId} />);
                  case 3 : return (<Categoryapps category={category}/>);
                  case 4 : return (<HighierApp apps={appsHighier}/>);
                  case 5 : return (
                        <Launchapps apps={appsSorted}/>);

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
      
      // To AllAPPS Page
      const dataapp = await app.find({}).toArray();
      const apps = JSON.parse(JSON.stringify(dataapp));
      
      //To LauncheApps pages
      const sortedApp = await app.find({}).sort({createdAt: -1}).toArray();
      const appsSorted = JSON.parse(JSON.stringify(sortedApp));

      const  highierApp = await app.find({}).sort({"stars.likes": -1}).toArray();
      const appsHighier = JSON.parse(JSON.stringify(highierApp));
     

     
      const category =  apps.reduce((acc, elem)=>{
            if(acc[elem.categoria]){
                  acc[elem.categoria].push(elem);
            } else {
                  acc[elem.categoria] = [];
                  acc[elem.categoria].push(elem);     
            }
            return acc;
        }, {})


      return {
            props:{
                  apps,
                  category,
                  appsSorted,
                  appsHighier
            }
      }
}