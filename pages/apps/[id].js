import {useEffect,useState} from 'react';
import {useRouter} from 'next/router';
import { ObjectId } from 'mongodb';
import {ConnectToDatabase} from '../../db/connection';
import styles from './id.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPen } from '@fortawesome/free-solid-svg-icons';


export default function appDetails({ app }){
      const router = useRouter();
      const [myId,setId] = useState();

      useEffect(() => setId(sessionStorage.getItem('tokenId')),[router.isReady])

      const onSave = () => {

      }

      return (
            <div className={styles.container}>
                   
                        <div className={styles.header}>
                              <img className={styles.img} src ={'/appfiles/'+app.avatar}/>
                           
                              <div className={styles.block}>
                                    <p>{app.name}</p>
                                    <span><p>Link </p></span>
                                    <div className={styles.contentapp}>
                                          <p>
                                                <span>{app.stars.likes}</span> <FontAwesomeIcon icon={faStar} />
                                          </p>
                                          <p>
                                               Negociações  <span>{app.negociations.length} </span>
                                          </p>
                                    </div>
                              </div>
                        </div> 
                        <div className={styles.inputandedit}>
                              {myId == app.userId ?
                              <div>
                                    <div className={styles.inputs}>
                                          <input type='file' placeholder='Foto' className={myId != app.userId ? styles.disabled : ''}/>
                                          <input type='text' placeholder='Nome do aplicativo' className={myId != app.userId ? styles.disabled : ''}/>
                                          <input type='text' placeholder='Descrição' className={myId != app.userId ? styles.disabled : ''}/>
                                    </div>
                                    <span><FontAwesomeIcon icon={faPen} onClick={onSave}/></span>
                              </div>:''}
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