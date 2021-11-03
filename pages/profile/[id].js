import { useRouter } from 'next/router'
import { useEffect, useState, Fragment } from 'react'
import axios from 'axios'

import App from '../../components/Apps'
import { ConnectToDatabase } from '../../db/connection'
import styles from './profile.module.css'
import { ObjectId } from 'bson'

export default function User({ user }){
    const router = useRouter();
    const [follow, updateFollow] = useState(false);
    const [myId, updateMyId] = useState(null);
    
    useEffect(() => {
        updateMyId(sessionStorage.getItem('tokenId')); 
    },[]);

    const goTo = () => {
        if(myId != undefined || myId != ''){
            router.push(`/apps/newapp`);
        }else {
            router.push(`/account/create`);
        } 
    }

    const onFollow = async ()  => {
        if(user._id !== myId){
            const following = await axios.put('/api/user/follow',{
                myId,
                idUserWhoIwantToFollow:user._id
            })
            following ? updateFollow(!follow) : '' ;
        }    
    }

    return(
        <div className={styles.container}>
            <div className={styles.profile}>
                <div className={styles.borderIamge}>
                    {/* <img src={user.photo ? user.photo : '/camera.png' }/> */}
                </div>
                <p className={styles.username}>{`@${user.name}`}</p>
                <p className={styles.descritpion}>{user.description}</p>
                <button onClick={ onFollow }>{ follow ? 'seguindo':'seguir' }</button>
            </div>

            <div className={styles.appSection}>
                <div className={styles.connections}>
                    <p><span>Meus aplicativos</span></p>
                    <div> {
                            user.apps ? user.apps.map((app, index)=> (
                            <div>
                                <h1> {app.name} </h1>
                                <h3 className={styles.titulo}>Descrição:</h3 >
                                <h3 className={styles.conteudo}> {app.link}</h3>
                                <h3 className={styles.titulo}> Link</h3> 
                                <h3 className={styles.conteudo}> {app.description}</h3>
                                <hr/>
                            </div> 
                           )) : ''
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
                            user.apps ? user.apps.map(app => {
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

    const id = context.params.id;
    const db = await ConnectToDatabase();
    const users = await db.collection('users');
    const data = await users.findOne({"_id":ObjectId(id)},{password:0});
    const user = JSON.parse(JSON.stringify(data));
    console.log(user);

    return{
        props:{
            user
        }
    }

}
 

