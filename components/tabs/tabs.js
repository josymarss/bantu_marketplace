import styles from './tabs.module.css';
import { useState,useEffect, useContext } from 'react';
import { AppContext } from '../../pages/_app';

export default function Tabs(){
      const {element, setElement} = useContext(AppContext);

      useEffect(()=>{
            
      },[])
      
      return(
                  <aside className={styles.list}>
                        <ul>
                              <li onClick={() => setElement(1)} className={element=='1' ? styles.active : ''}>Todos aplicativos</li>
                              <li onClick={() => setElement(2)} className={element=='2' ? styles.active : ''}>Favoritos</li>
                              <li onClick={() => setElement(3)} className={element=='3' ? styles.active : ''}>Categorias</li>
                              <li onClick={() => setElement(4)} className={element=='4' ? styles.active : ''}>Em alta</li>
                              <li onClick={() => setElement(5)} className={element=='5' ? styles.active : ''}>Lançamentos</li>
                        </ul>
                  </aside>
      );
}