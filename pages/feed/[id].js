import {useState,useEffect, Fragment} from 'react';
import {useRouter} from 'next/router';
import {ObjectId} from 'mongodb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import {ConnectToDatabase} from '../../db/connection';
import styles from './feed.module.css'
import Image from 'next/image';

import HeadComponent from '../Head'; 

export default function Feed({ user }){
     const [data,setData] = useState();
     const router = useRouter();

     useEffect(()=>[]);

     const FeedComponent = ({avatar, name, app}) =>(
          <div className={styles.feedcomponent}>
               <div className={styles.userdata}>
                    <img 
                         className={styles.userdataimg}
                         src={`/uploads/${avatar}`}
                    />
                    <p onClick={() => router.push('/profile/'+user._id)} className={styles.username}>{name} </p>
                    <p><span>iniciou uma uma nova negociação.</span></p>
               </div>
               <div className={styles.content}>
                    <div className={styles.appcontent}>
                         <p 
                              onClick={() => router.push('/apps/'+app._id)} 
                              className={styles.appname}
                         >
                              {app.name}
                         </p>
                         <p><span>{app.description.length>50?app.description.substring(0,55)+'...':app.description}</span></p>
                    </div>
                    <div className={styles.star}>
                         <span><FontAwesomeIcon icon={faStar} /></span>
                         <p>{app.stars.likes}</p>
                    </div>
               </div>
          </div>   
     )
     const FeedData = () =>  user.feed.length == 0 ? <p>Sem actividade, preocure por seguidores e siga-aos para ver o que têm neogicado.</p>:
          user.feed.map((content,index) =>
               <FeedComponent 
                    avatar={content.avatar?content.avatar:<p>NoPhoto</p>}
                    name={content.name}
                    app={content.app}
                    key={index}
               /> 
          );
     
     return(<>
          <HeadComponent title='Actividades'/>
          <div className={styles.activity}>
               <FeedData/>
          </div>
     </>);
}

export async function getServerSideProps(context) {
     const db = await ConnectToDatabase();
     const id = context.params.id;
     const users = await db.collection('users');

     const data = await users.findOne({_id:ObjectId(id)},{password:0});
     const user = JSON.parse(JSON.stringify(data));
          
     return {
          props:{
               user
          }
     }
}
