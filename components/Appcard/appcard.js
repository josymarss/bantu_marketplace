import { useRouter } from 'next/router';
import React, {useEffect, useState } from 'react';
import axios from 'axios';
import styles from './appcard.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';

const AppCard = ({app}) => {
    const router = useRouter();
    const [myId,setId] = useState();
    const [appId,setAppId] = useState();
    const [appUserId,setAppUserId] = useState();
    const [likes, setLikes] = useState(app.stars.likes);

    useEffect(() => {
      let auxId = sessionStorage.getItem('tokenId');
      setId(auxId);
      setAppId(app._id);
      setAppUserId(app.userId);
    } ,[likes]);

    const addLike =()=> {
      if(myId === appUserId){
          return;
      }
       axios.post('/api/apps/addlike', {myId, appId})
       .then(res =>{ setLikes(v => v + res.data.like) });
    }
    const addFavourite =()=> {

    }
    return (
        <div className={styles.content}>
          <div className={styles.appcontent}>
               <p 
                    onClick={() => router.push('/apps/'+appId)} 
                    className={styles.appname}
               >
                    {app.name}
               </p>
               <p><span>{app.description.length>50?app.description.substring(0,55)+'...':app.description}</span></p>
               <div className={styles.favourites}>
               <div className={styles.star}>
                    <span  onClick={addLike}><FontAwesomeIcon icon={faStar} /></span>
                    <p>{likes}</p>
               </div>
               <div className={styles.favourite}>
                    <span  onClick={addFavourite}><FontAwesomeIcon icon={faHeart} /></span>
                    <p>0</p>
               </div>
               </div> 
          </div>
   </div>
    );
}

export default AppCard;
