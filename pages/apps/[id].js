import {useEffect,useState} from 'react';
import {useRouter} from 'next/router';
import { ObjectId } from 'mongodb';
import {ConnectToDatabase} from '../../db/connection';
import styles from './id.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


export default function appDetails({ app }){
      const router = useRouter();
      const [myId,setId] = useState();

      useEffect(() => setId(sessionStorage.getItem('tokenId')),[router.isReady])

      const onSave = () => {

      }

      return (
            <div className={styles.container}>
                   
                        <div className={styles.header}>
                           
                              <img src ={app.avatar}      />
                           
                              <div className={styles.block}>
                                    <p>{app.name}</p>
                                    <div className={styles.contentapp}>
                                          <p>
                                                <span>{app.stars.likes}</span> <FontAwesomeIcon icon={faStar} />
                                          </p>
                                          <p>
                                                <span>Negociações</span> {app.negociations.length} 
                                          </p>
                                    </div>
                              </div>
                              <button onClick={onSave}>Salvar</button>
                        <div className={styles.inputandedit}>
                              <div className={styles.inputs}>
                                    <input type='file' placeholder='Foto' className={myId != app.userId ? styles.disabled : ''}/>
                                    <input type='text' placeholder='Nome do aplicativo' className={myId != app.userId ? styles.disabled : ''}/>
                                    <input type='text' placeholder='Descrição' className={myId != app.userId ? styles.disabled : ''}/>
                              </div>
                              <button onClick={onSave} className={myId != app.userId ? styles.disabled : styles.button}>Salvar</button>

                        </div>
                       </div> 
            </div>
      );
}
// Show app data with good layout 
      /* 
            - name 
            - image 
            - link 
            - % of the app who will be nogiciate 
            - number of negociations
            - status(negociate or not)
            - data of the user's app  
      */


// Edit, delete app, 

// Add any description of negociation(% of the apps free and how much to negociate)

// Number of negociations 

// If ap is mine must be able the button edit 

export async function getServerSideProps (context) {
      const db = await ConnectToDatabase();
      const id = context.params.id;
      const apps = await db.collection('apps').findOne({_id:ObjectId(id)});

      return {
            props:{
                  app:JSON.parse(JSON.stringify(apps))
            }
      }

}