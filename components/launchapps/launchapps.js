import React, { useEffect } from 'react';
import AppCard from '../Appcard/appcard';
import styles from './launchapps.module.css'
const Launchapps = ({apps}) => {
    return (
        <div className={styles.container}>
            <h2>Lançamento</h2>
            <div className={styles.containerApp}>
            {
                apps.length === 0 ? <p> Sem Lançamento</p> : apps.map((elem, index)=> <AppCard app={elem} key={index}/>)
            }
            </div>
        </div>

    );
}

export default Launchapps;
