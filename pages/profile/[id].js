import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ObjectId } from 'mongodb';
import { ConnectToDatabase } from '../../db/connection';
import axios from 'axios';

import styles from './profile.module.css';
import App from '../apps/app';

export default function User({ user,apps }){
    const router = useRouter();
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
        }
    },[router.isReady])
   

    const verifyFollow = async () => {
        if(user._id !== myId){
            const following = await axios.put('/api/user/follow',{
                myId,
                idUserWhoIwantToFollow:user._id
            });
            console.log(following)
            if(following.data.state){
                updateFollow(following.data.state);
            };
            
            router.reload(window.location.pathname);
        }
    }
    
    return(
        <div className={styles.container}>
            <div className={styles.profile}>
                <img 
                    className={styles.img}
                    src={user.avatar ? `/uploads/${user.avatar}` : '/camera.png' }
                /> 
                <p className={styles.fullName}>{user.fullName}</p>
                <div className={styles.tofollow}>
                    <p className={styles.username}>{`@${user.name}`}</p>
                    {user._id !== myId ? 
                    <span>
                        <p className={follow ? styles.seguindo : styles.notfollowing} onClick={ verifyFollow }>
                                {follow? 'seguindo' : 'seguir'}
                        </p>
                    </span>
                    : ''
                }
                </div>
                
            </div>
            <p className={styles.descritpion}>{user.description}</p>

            <div className={styles.appSection}>
                <h4>Meus aplicativos</h4>
                <hr
                style={{
                    marginTop:'-8px',
                    marginBottom:'12px',
                    borderRadius:'6px',
                    height:.2,
                    width:'800px',
                    color:'lightgray'
                }}/>
                <div className={styles.myapps}>
                    {apps ? apps.map((app,index) => <App key={index} application={app} userid={user._id}/>) : ''}
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps = async (context) => {

    const id = context.params.id;
    const db = await ConnectToDatabase();
    const users = await db.collection('users');
    const data = await users.findOne({"_id": new ObjectId(id)},{password:0});
    const user = JSON.parse(JSON.stringify(data));

    const app = await db.collection('apps');
    const dataapp = await app.find({userId:id}).toArray();
    const apps = JSON.parse(JSON.stringify(dataapp));
   
    return{
        props:{
            user,
            apps
        }
    }

}

 

