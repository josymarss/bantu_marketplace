import styles from './tabs.module.css';
import { useState,useEffect,Fragment } from 'react';

export default function Tabs({ children, label }){
      const [element, setElement] = useState(1);
     
      useEffect(()=>{
            
      },[])
      
      return(
            <div className={styles.container}>
                  <aside className={styles.list}>
                        <ul>
                              <li onClick={() => setElement(1)} className={element=='1' ? styles.active : ''}>Todos aplicativos</li>
                              <li onClick={() => setElement(2)} className={element=='2' ? styles.active : ''}>Favoritos</li>
                              <li onClick={() => setElement(3)} className={element=='3' ? styles.active : ''}>Categorias</li>
                              <li onClick={() => setElement(4)} className={element=='4' ? styles.active : ''}>Em alta</li>
                              <li onClick={() => setElement(5)} className={element=='5' ? styles.active : ''}>Lancamentos</li>
                        </ul>
                  </aside>

                  <aside className={styles.display}>
                        {/* removed label was props.label */}
                       {[children].map(child => 
                             child.props == element ? <Fragment>{child}</Fragment> : ''
                       )}
                  </aside>
            </div>
      );
}