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
    const [likeToggle, setLikeToggle] = useState();
    const [favourite, setFavourite] = useState(false);

     useEffect(()=> {
          if(myId !== undefined){
               savedFavourires(myId, appId)
               liked()
          }

     })

    useEffect(() => {
      let auxId = sessionStorage.getItem('tokenId');
      setId(auxId);
      setAppId(app._id);
      setAppUserId(app.userId);
    } ,[likes]);


     const savedFavourires = (myId, appId) => {
          axios.put('/api/user/favourites', {myId: myId, appId:appId})
          .then(res =>{
               setFavourite(res.data.value)
          });
     }  
     const addFavourite =()=> {
          axios.post('/api/user/favourites', {myId, appId})
          .then(res => {
               setFavourite(res.data.value)
          });
    }

    const addLike =()=> {
      if(myId === appUserId){
          return;
      }
       axios.post('/api/apps/addlike', {myId, appId})
       .then(res =>{ 
          setLikes(v => v + res.data.like) 
     });
    }

      const liked = () => {
          axios.put('/api/apps/addlike', {myId, appId})
          .then(res =>{ 
               setLikeToggle(res.data.value)
          });
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
               <div className={likeToggle?`${styles.star} ${styles.star_blue}` : `${styles.star} ${styles.star_black}`}>
                    <span  onClick={addLike}><FontAwesomeIcon icon={faStar} /></span>
                    <p className={styles.star_number}>{likes}</p>
               </div>
               <div className={styles.favourite}>
                    <span className={favourite ? styles.favourites_selected : styles.unfavourites_selected} onClick={addFavourite}><FontAwesomeIcon icon={faHeart} /></span>
                    <p>0</p>
               </div>
               </div> 
          </div>
   </div>
    );
}

export default AppCard;
