// import {ObjectId} from 'mongodb';
import {ConnectToDatabase} from '../../db/connection';
import styles from './id.module.css';

export default function appDetails(){
      return (
            <div className={styles.container}>
                        
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
      const apps = await db.collection('apps');

      return {
            props:{}
      }

}