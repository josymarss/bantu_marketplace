import { Fragment } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

import styles from './adminpanel.module.css'

export default function AppsToAcept({ appsToAcept, appsAcepted }) {

    const myId = Cookies.get('tokenId')

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
                        <button onClick={axios.post('/api/admin/aceptedapps',{
                            app
                        })}>
                            Aceitar
                        </button>
                        <button onClick={axios.delete('/api/admin/aceptedapps',{
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
    const aplicativosPorAceitar = await appstoacept.find({})

    const appsacepted = await db.collection('appsacepted')
    const aplicativosAceitados = await appsacepted.find({})

    const appsAcepted = []
    
    const appsToAcept = []
    
    aplicativosPorAceitar.map(apli => appsToAcept.push(apli))
    aplicativosAceitados.map(apli => appsAcepted.push(apli))

    return {
        props: {
            appsAcepted,
            appsToAcept
        }
    }

}