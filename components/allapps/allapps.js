import React from 'react';
import AppCard from '../Appcard/appcard';
import styles from './allapps.module.css'

const Allapps = ({apps}) => {
    return (
        <div className={styles.container}>
            <h2>Todos aplicativos</h2>
            <div className={styles.containerApp}>
                {
                   apps.length === 0 ? <p> Sem Aplicativos</p> : apps.map((elem, index)=> <AppCard app={elem} key={index}/>)
                }
            </div>
        </div>
    );
}
export default Allapps;
