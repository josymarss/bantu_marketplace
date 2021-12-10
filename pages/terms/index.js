import styles from './terms.module.css';

import HeadComponent from '../Head'; 

export default function Terms(){
      return(<>
            <HeadComponent title='Termos de uso'/>
            <div className={styles.container}>
                  <h3>Aplicativos</h3>
                  <ul>
                        <li>Upload de aplicativos</li>
                  </ul>

                  <br />
                  
                  <h3>Negocições</h3>
                  <ul>
                        <li>Upload de aplicativos</li>
                  </ul>

                  <br />
            </div>
      </>);
}