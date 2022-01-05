import styles from './tabs.module.css';
import { useState } from 'react';

export default function Tabs({ children }){
      const [active, setActive] = useState();

      return(
            <div className={}>
                  <aside className={styles.list}>
                        <ul>
                              <li onClick={active?} className={styles.element}>Meus aplicativos</li>
                              <li className={styles.element}>Favoritos</li>
                              <li className={styles.element}>Categorias</li>
                              <li className={styles.element}>Em alta</li>
                              <li className={styles.element}>lancamentos</li>
                        </ul>
                  </aside>

                  <aside className={styles.diplay}>
                       {children} 
                  </aside>
            </div>
      );
}