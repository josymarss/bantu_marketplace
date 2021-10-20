import { useState,useEffect } from 'react'
import {ConnectToDatabase} from '../../db/connection'

import AplicativosForAcept  from './aplicativosForAcept'
import AplicativosAcepted  from './AplicativosAcepted'

import adminpanel from './adminpanel.module.css'

export default function AppsToAcept({ appsToAcept, appsToAcepted}) {
    const [dataToAcept, updateDataToAcept] = useState(JSON.parse(appsToAcept))
    const [dataToAcepted, updateDataToAcepted] = useState(JSON.parse(appsToAcepted))
     
    
    
    useEffect(( ) => {
        // appsToAcept = JSON.parse(appsToAcept)
        // appsToAcepted = JSON.parse(appsToAcepted)
    },[])
 
    return(
        <div className={adminpanel.container}>            
            <input type='search' placeholder="Pesquisar por um aplicativo"/>

            <div className={adminpanel.aside}>  
                <div className={adminpanel.aplicativoPorAceitar}>
                    <h2>Aplicativos para aceitar</h2>
                    { dataToAcept.map((app, index) => ( 
                                               
                      <AplicativosForAcept key={index}  app ={app} />    
                        
                    ))}
                </div>
                <div className={adminpanel.aplicativosAceites}>
                    <h2>Aplicativos aceites</h2>
                 { dataToAcepted.map((app, index) => ( 
                                               
                <AplicativosAcepted key={index}  app ={app} />    
                                                 
                ))}                    
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps = async () => {

    const db = await ConnectToDatabase()
    
    const appstoacept = await db.collection('appstoacept')
    const appsToAcept  = [] 
    const aplicativos = await appstoacept.find({}).limit(5).
                                    forEach(item => appsToAcept.push(item))
    

     const appsacepted = await db.collection('aceptedapps') 
     const appsAcepted  = [] 
     const aplica = await appsacepted.find({}).limit(5).
                                    forEach(item => appsAcepted.push(item))
     

  

    return {
        props: {
            
            appsToAcept: JSON.stringify(appsToAcept),
            appsToAcepted: JSON.stringify(appsAcepted)
            
        }
    }
}