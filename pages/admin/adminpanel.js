import { useState,useEffect,Fragment } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {ConnectToDatabase} from '../../db/connection'

import App from '../apps/app'
import styles from './adminpanel.module.css'

export default function AppsToAcept({ appsToAcept, appsAcepted }) {

    // const [myId, updateId] = useState(Cookies.get('tokenId'))
    useEffect(() => {
    console.log(appsToAcept);

        // appsToAcept = JSON.parse(appsToAcept)
    },[])
    const onAcept = ()=> {
        
    }

    return(
        <div className={styles.container}>

            {appsToAcept.map(app => {
                <Fragment>
                    <App 
                        width={20} 
                        height={20} 
                        name={app.name} 
                        description={app.description}
                    />
                    <div className={styles.buttons}>
                        <button onClick={() => axios.post('/api/admin/appstoacept',{
                                app
                            })
                        }>
                            Aceitar
                        </button>
                        <button onClick={() => axios.delete('/api/admin/aceptedapps',{
                            app
                        })}>
                            Rejetar
                        </button>
                    </div>
                </Fragment>
                
            })}
        
        </div>
    )
}
export const getServerSideProps = async () => {

    const db = await ConnectToDatabase()
    
    const appstoacept = await db.collection('appstoacept')
    const appsToAcept = []
    const aplicativosPorAceitar = await appstoacept.find({}).
                                    forEach(item => appsToAcept.push(JSON.stringify(item)))

    // const appsacepted = await db.collection('appsacepted')
    // const aplicativosAceitados = await appsacepted.find({})
    

    const appsAcepted = []
    
    
    
    //aplicativosPorAceitar.ops[0].map(apli => appsToAcept.push(apli))
   // aplicativosAceitados.ops[0].map(apli => appsAcepted.push(apli))

    return {
        props: {
            //appsAcepted,
            appsToAcept
        }
    }

}