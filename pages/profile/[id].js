import { useRouter } from 'next/router'
import { useEffect, useState, Fragment } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

import { ConnectToDatabase } from '../../db/connection'
import styles from './profile.module.css'
import { ObjectId } from 'bson'

export default function User({ user }){
    
    const [follow, updateFollow] = useState(false)
    const [myId, updateMyId] = useState('')
    const [userdata, updateUserdata] = useState('')
    const router = useRouter()

    useEffect(() => {
        updateUserdata(JSON.parse(user))
        // myId = Cookies.get('tokenId')
    },[])

    const onFollow = async ()  => {
        
        if(_idValue !== myId){
            const following = await axios.put('/api/user/follow',{
                myId,
                idUserWhoIwantToFollow:userdata._id
            })
            updateFollow(!follow)
        }    
    }

    return(
        <div className={styles.container}>

            <div className={styles.profile}>
                <div className={styles.borderIamge}>
                    {/* <img src={user.photo ? user.photo : '/camera.png' }/> */}
                </div>
                <p className={styles.username}>{`@${userdata.name}`}</p>
                <p className={styles.descritpion}>{userdata.description}</p>
                <button onClick={ onFollow }>{ follow ? 'seguindo':'seguir' }</button>
            </div>

            <div className={styles.appSection}>
                <input type='text' name='procurar' ploaceholder='procurar um app'/>
                <div className={styles.connections}>
                    <p><span>Meus aplicativos</span></p>
                    <div className={styles.appSolicitar}>
                        {
                            userdata.apps ? userdata.apps.map(app => {
                            <Fragment>
                                <App width={22} height={22} name={app.name}/>
                                <button onClick={() => router.push({
                                    pathname:'/negociation/newnegociation',
                                    query:{ 
                                        nameApp: app.name,
                                        idUser:myId,
                                        idUserOfTheApp:userdata._id
                                    }})
                                }>
                                    Negociar 
                                </button>
                            </Fragment>}) : ' '
                            }
                    </div>
                </div>

                <div className={styles.negociations}>
                    <p><span>solicitações de negociações</span></p>
                    <div className={styles.solicitation}>
                        {/* {apps.negociations.map(app => {
                            <Fragment>
                                <App width={22} height={22} name='Tupuca'/>
                                <div className={styles.solicitationsButton}>
                                <button className={styles.aceitar}><span>Aceitar</span></button>
                                <button className={styles.btnBusiness}>Editar</button>
                                </div>
                            </Fragment>
                        })} */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps = async (context) => {

    const id = context.params.id
    
    const db = await ConnectToDatabase()
    const users = await db.collection('users')
    const data = await users.findOne({"_id":ObjectId(id)},{password:0})
    console.log(data)
    const user = JSON.stringify(data)
    console.log(user)
    
    return{
        props:{
            user
        }
    }

}