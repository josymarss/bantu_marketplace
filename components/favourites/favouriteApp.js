import axios from 'axios';
import React, { useEffect, useState} from 'react';
import AppCard from '../Appcard/appcard';
import styles from './favourites.module.css';

const FavouriteApp = ({myId}) => {
    const [favourites, setFavourites] = useState([]);

    useEffect(()=>{
      axios.post('/api/user/favourites', {myId}).then((res)=> setFavourites(res.data))
    },[favourites]);
    return (
        <div className={styles.container}>
            <h2>Favoritos</h2>
            <div className={styles.containerApp}>
                {   
                  favourites.length === 0 ? <p> Sem favoritos</p> : favourites.map((elem, index)=> <AppCard app={elem} key={index}/>)
                }
            </div>
        </div>
    );
}
export default FavouriteApp;
