import { useEffect, useState, Fragment } from 'react'
import axios from 'axios'

import App from './app'
import { ConnectToDatabase } from '../../db/connection'
import  styles  from './listofapps.module.css'

export default function ListOfApps({ apps }){

    const [searched, updateSearch] = useState(false)

    useEffect(() => {
        /* don't forget to unseriallize to JSON.parse the apps var */
        
    },[searched])

    const onSearch = (e) => {
        const { value } = e.target
        const appsSearched = axios.post('/api/apps/search',{
            value
        })
        if(appsSearched){
            updateSearch(!searched)
        }    
    }


    const PageApps = () =>{
        searched ? 
            <Fragment>
                {/* Maping all finded apps */}
                <p>Aplicativos encontrados</p>
            </Fragment>
                :
            <div className={styles.container}>// put it flex wrap to break into another line
                <section className={styles.searchApp}>
                    <input 
                        type='text'
                        placeholder='Preocurar um aplicativo' 
                        onKeyUp={onSearch}
                    />
                </section>
                <div className={styles.appSection}> /the section that will be gray
                    <div className={styles.imageSection}>
                        {/* <img href={`./public/camera.png`} /> */}
                        <h1>App name</h1>
                        <p>Some deescription</p>
                    </div>
                   
                </div>    
            </div>
    }
    
     return (
        //  map to apps who have likes between 20 and 
        
        <PageApps />
     );
} 

const getServerSideProps = async (context) => {
    const db = await ConnectToDatabase()
    const apps = []
 
    await db.find.users({},{apps:1}).
    forEach(app => apps.push(app))
    
    
    // don't forget to seriallize to JSON.stringify

    return {
        props:{
            apps
        }
    }
}