import { Fragment } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function AppsToAcept({ apps }) {

    const myId = Cookies.get('tokenId')

    return(
        <div className={StyleSheet.container}>

            {apps.map(app => {
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
    const apps = []
    
    aplicativosPorAceitar.map(apli => apps.push(apli))

    return {
        props: {
            apps
        }
    }

}