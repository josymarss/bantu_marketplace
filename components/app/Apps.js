import styles from './App.module.css'

export default function App({name,icon,description}){
     return (
          <div className={styles.appContainer}>
               <div className={user}>
                    <div className={styles.imageBorder}>
                         <img 
                              src={props.icon} 
                              className={styles.icon} 
                         />
                    </div>
                    <p className={styles.name}>{name}</p>
               </div>
               <p className={styles.description}>{!description?'':'description'}</p>
          </div>
     );
}

