import {useState,useEffect, Fragment} from 'react';
import {useRouter} from 'next/router';
import {ObjectId} from 'mongodb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import {ConnectToDatabase} from '../../db/connection';
import styles from './feed.module.css'

import HeadComponent from '../Head'; 
import AppCard from '../../components/Appcard/appcard';

export default function Feed({ user }){
     const [data,setData] = useState();
     const router = useRouter();

     useEffect(()=>{},[]);
     const FeedComponent = ({avatar, name, app,id}) =>(
          <div className={styles.feedcomponent}>
               <div className={styles.userdata}>
                    <img 
                         className={styles.userdataimg}
                         src={`/uploads/${avatar}`}
                    />
                    <p onClick={() => router.push('/profile/'+id)} className={styles.username}>{name} </p>
                    <p><span>iniciou uma uma nova negociação.</span></p>
               </div>
                    <AppCard app= {app}/>
          </div>   
     )


     const FeedData = () =>  user.feed.length == 0 ? <p>Sem actividade, preocure por seguidores e siga-aos para ver o que têm neogicado.</p>:
          user.feed.map((content,index) =>
               <FeedComponent  
                    avatar={content.avatar?content.avatar:<p>NoPhoto</p>}
                    name={content.name}
                    app={content.app}
                    key={index}
                    id={content.iduser}
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
