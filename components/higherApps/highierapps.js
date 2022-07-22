import React, { useEffect } from 'react';
import AppCard from '../Appcard/appcard';
import styles from './highierapp.module.css'
const HighierApp = ({apps}) => {
    return (
        <div className={styles.container}>
            <h2>Em alta</h2>
            <div className={styles.containerApp}>
            {
                apps.length === 0 ? <p> Sem favoritos</p> : apps.map((elem, index)=> <AppCard app={elem} key={index}/>)
            }
            </div>
        </div>

    );
}

export default HighierApp;
