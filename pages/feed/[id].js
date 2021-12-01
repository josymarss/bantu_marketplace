import {useState,useEffect, Fragment} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {ObjectId} from 'mongodb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import {ConnectToDatabase} from '../../db/connection';
import styles from './feed.module.css'

export default function Feed({ user }){

     const FeedComponent = ({avatar, name, app}) =>(
          <div className={styles.feedcomponent}>
               <div className={styles.userdata}>
                    <img src={avatar}/>
                    <p>{name}</p>
               </div>
               <div className={styles.content}>
                    <div className={styles.appcontent}>
                         <p className={styles.appname}>{app.name}</p>
                         <p><span>{app.description}</span></p>
                    </div>
                    <div className={styles.star}>
                         <span><FontAwesomeIcon icon={faStar} /></span>
                         <p>{app.stars.likes}</p>
                    </div>
               </div>
          </div>   
     )

     useEffect(()=>[]);
     return(
          <div className={styles.activity}>
               {user.feed.length == 0 ? <p>Sem actividade, preocure por seguidores.</p>:
                    user.feed.map((content,index) =>
                         <FeedComponent 
                              avatar={content.avatar}
                              name={content.name}
                              app={content.app}
                         /> 
                    )}
          </div>
     );
}

export async function getServerSideProps(context) {
     const db = await ConnectToDatabase();
     const id = context.params.id;
     const users = await db.collection('users');

     const data = await users.findOne({_id:new ObjectId(id)},{password:0});
     const user = JSON.parse(JSON.stringify(data));
     let arraysIdApp = [];
     user.feed.map(async (content) => {
          arraysIdApp.push(await db.collection('apps')
          .findOne({_id:new ObjectId(content.app._id)}));
     })
     

     console.log(arraysIdApp);
          
     return {
          props:{
               user
          }
     }
}
