import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import { ObjectId } from 'mongodb';
import { ConnectToDatabase } from '../../db/connection';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import styles from './profile.module.css';
import HeadComponent from '../Head';
import {RefreshMenuContext } from '../_app';

export default function User({ user,apps,id,negociationsDone }){
    const router = useRouter();
    const {setRefreshMenu} = useContext(RefreshMenuContext);
    const [follow, updateFollow] = useState(false);
    const [myId, updateMyId] = useState();
    
    useEffect(()=>{
        if(router.isReady){
            updateMyId(sessionStorage.getItem('tokenId'));
            user.followers ? user.followers.map(id => {
                if(id === myId){
                    updateFollow(true);
                }
            }) : updateFollow(false) ;
            setRefreshMenu(v=> v +1)
        }
    },[router.isReady])
   

    const verifyFollow = async () => {
        if(user._id !== myId){
            const following = await axios.put('/api/user/follow',{
                myId,
                idUserWhoIwantToFollow:user._id
            });
            if(following.data.state){
                updateFollow(following.data.state);
            };
            
            router.reload(window.location.pathname);
        }
    }
    
    return(
        <>
        <HeadComponent title={`Perfil de ${user.fullName}`} />
        <div className={styles.container}>
           
            <div className={styles.profile}>
                
                <img 
                    className={styles.img}
                    src={user.avatar ? `/uploads/${user.avatar}` : '/camera.png' }
                /> 
                
                <div className={styles.edit}>
                    <p className={styles.fullName}>{user.fullName}</p>
                    {user._id === myId ?
                        <span>
                            <FontAwesomeIcon 
                                onClick={() => router.push('/profile/edit/'+myId) }
                                icon={faPen} 
                            />
                        </span>: ''}
                </div>
                    
                <div className={styles.tofollow}>
                    <p className={styles.username}>{`@${user.name}`}</p>
                   
                    {user._id !== myId ?
                    
                    <>
                        <span>
                            <p className={follow ? styles.seguindo : styles.notfollowing} onClick={ verifyFollow }>
                                    {follow? 'seguindo' : 'seguir'}
                            </p>
                        </span>
                    
                    </>
                    :  ''
                   
                }
                </div>

                <dic className={styles.dataapp}>
                    <p>Aplicativos <span>{apps? apps.length: 0}</span></p>
                    <p>Negociações fechadas<span>{negociationsDone ? negociationsDone.length: 0}</span></p>
                    <p className={styles.followers} onClick={() => router.push('/profile/followers/'+id)}>Seguidores <span>{user? user.followers.length: 0}</span></p>
                </dic>
                
            </div>
            <p className={styles.descritpion}>{user.description}</p>

            <div className={styles.appSection}>
                <h4>Meus aplicativos</h4>
                <hr
                style={{
                    marginTop:'-8px',
                    marginBottom:'12px',
                    borderRadius:'6px',
                    height:.1,
                    width:'800px',
                    color:'lightgray'
                }}/>
                <div className={styles.myapps}>
                    {apps ? apps.map((app,index) => 
                        <div className={styles.listApp}>
                            <div className={styles.app}>
                                <img className={styles.image} src={'/appfiles/'+app.avatar}/>
                                <p className={styles.title} onClick={() =>router.push('/apps/'+app._id)}>{app.name}</p>
                            </div>
                        </div>
                    ): <p>Sem aplicativos para mostrar</p>}
                </div>
            </div>
        </div>
    </>);
}

export const getServerSideProps = async (context) => {

    const id = context.params.id;
    const db = await ConnectToDatabase();
    const acepted= await db.collection('acepted');
    const users = await db.collection('users');

    const data = await users.findOne({_id:ObjectId(id)},{password:0});
    const user = JSON.parse(JSON.stringify(data));

    const app = await db.collection('apps');
    const dataapp = await app.find({userId:id}).toArray();
    
    const apps = JSON.parse(JSON.stringify(dataapp));
    let negociationsDone = await acepted.find({idproprietario:id}).toArray();
    negociationsDone = JSON.parse(JSON.stringify(negociationsDone));
   
    return{
        props:{
            user,
            apps, 
            id,
            negociationsDone
        }
    }

}

 

