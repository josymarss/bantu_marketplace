import { ConnectToDatabase } from '../../db/connection'
import styles from 'aceptedapps.module.css'
import App from '../apps/app'

export default function AceptedApps({ apps }){
    return(
        <div className={StyleSheet.container}>
            {apps.map(app => {
                <App 
                    width={20} 
                    height={20} 
                    name={app.name} 
                    description={app.description}
                    link={app.link}
                />
            })}
            
        </div>
    )
}

export const getServerSideProps = async () => {

    const db = await ConnectToDatabase()
    const aceptedapps = await db.collection('aceptedapps')
    const aplicativosAceitados = await aceptedapps.find({})
    const apps = []
    
    aplicativosAceitados.map(apli => apps.push(apli))

    return {
        props: {
            apps
        }
    }

}