import { useRouter } from 'next/router'
import { useEffect, useState, Fragment } from 'react'
import axios from 'axios'

import App from '../../components/Apps'
import { ConnectToDatabase } from '../../db/connection'
import styles from './profile.module.css'
import { ObjectId } from 'bson'

export default function User({ user, apps }){
    const router = useRouter()
    const [follow, updateFollow] = useState(false)
    const [myId, updateMyId] = useState(null)
    const [userdata, updateUserdata] = useState('')
    const [app, updateApp] = useState([])
    
    console.log(app)
     
    

     

    useEffect(() => {
        updateUserdata(JSON.parse(user))
        const aux = userdata._id
        updateMyId(aux);
        updateApp(JSON.parse(apps))
        const userDataLocal = [{name: userdata.name, id: aux}]

        sessionStorage.setItem('userDataLocal', JSON.stringify(userDataLocal));

         
         
    },[userdata._id])

    const goTo = () => {
        router.push(`/apps/${myId}`)
    }
     
    
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
                <input type='text' name='procurar' placeholder='procurar um app'/>
                <div className={styles.connections}>
                    <p><span>Meus aplicativos</span></p>
                    <div> {
                            app.map((app, index)=> (
                            <div>
                              
                                <h1> {app.app.name} </h1>
                                <h3 className={styles.titulo}>Descrição:</h3 >
                                <h3 className={styles.conteudo}> {app.app.link}</h3>
                                <h3 className={styles.titulo}> Link</h3> 
                                <h3 className={styles.conteudo}> {app.app.description}</h3>
                             

                               
                                <hr/>


                            </div> 
                           ))
                        }
                        
                        </div>        
               </div>
               <div>
                    <div className={styles.newApp}>
                        <button onClick={goTo}>
                            Adicionar
                        </button>
                        <p> Cadastrar dados de aplicativo</p>
                    </div>
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
    const user = JSON.stringify(data)
    

    const appsacepted = await db.collection('aceptedapps') 
    const appsAcepted  = [] 
    
    await appsacepted.find({'myId':id}).limit(5).
                                   forEach(item => appsAcepted.push(item))
    
    return{
        props:{
            user,
            apps: JSON.stringify(appsAcepted)
        }
    }

}
 

