import { useRouter } from 'next/router'
import { useEffect, useState, Fragment } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

import { ConnectToDatabase } from '../../db/connection'
import styles from './profile.module.css'

export default function User({ userInfo }){
    
    const [follow, updateFollow] = useState(false)
    const myId = ''
    const router = useRouter()

    useEffect(() => { myId = Cookies.get('tokenId') })

    const onFollow = ()  => {
        
        if(userInfo._id !== myId){
            const following = await axios.put('/api/user/follow',{
                myId,
                idUserWhoIwantToFollow:user.userInfo._id
            })
            updateFollow(follow)
        }    
    }

    return(
        <div className={styles.container}>

            <div className={styles.profile}>
                <div className={styles.borderIamge}>
                    <img src={userInfo.photo ? userInfo.photo : '/camera.png' }/>
                </div>
                <p className={styles.username}>{`@${userInfo.name}`}</p>
                <p className={styles.descritpion}>{userInfo.description}</p>
                <button onClick={ onFollow }>{ follow ? 'seguindo':'seguir' }</button>
            </div>

            <div className={styles.appSection}>
                <input type='text' name='procurar' ploaceholder='procurar um app'/>
                <div className={styles.connections}>
                    <p><span>Meus aplicativos</span></p>
                    <div className={styles.appSolicitar}>
                        {apps.map(app => {
                            <Fragment>
                                <App width={22} height={22} name={app.name}/>
                                <button onClick={router.push({
                                    pathname:'/negociation/newnegociation',
                                    query:{ 
                                        nameApp: app.name,
                                        idUser:myId,
                                        idUserOfApp:userInfo._id
                                    }})
                                }>
                                    Negociar 
                                </button>
                            </Fragment>
                            
                        })}
                    </div>
                </div>

                <div className={styles.negociations}>
                    <p><span>solicitações de negociações</span></p>
                    <div className={styles.solicitation}>
                        {apps.map(app => {
                            <Fragment>
                                <App width={22} height={22} name='Tupuca'/>
                                <div className={styles.solicitationsButton}>
                                <button className={styles.aceitar}><span>Aceitar</span></button>
                                <button className={styles.btnBusiness}>Editar</button>
                                </div>
                            </Fragment>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps = async (context) => {

    const id = context.query // id of the page not mine
    const db = await ConnectToDatabase()
    const users = await db.collection('users')
    const user = await users.findOne({ id })
    const { aplicativos, ...userInfo } = user
    const apps = null 
    aplicativos.map(app => apps.push(app))

    return{
        props:{
            apps,
            userInfo
        }
    }

}