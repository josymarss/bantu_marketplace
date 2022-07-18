import React, { useEffect } from 'react';
import AppCard from '../Appcard/appcard';
import styles from './highierapp.module.css'
const HighierApp = ({apps}) => {
    return (
        <div className={styles.container}>
            <h2>Lançamento</h2>
            <div className={styles.containerApp}>
            {
                apps.map((elem, index)=> <AppCard app={elem} index={index}/>)
            }
            </div>
        </div>

    );
}

export default HighierApp;
