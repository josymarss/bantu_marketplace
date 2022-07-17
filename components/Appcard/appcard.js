import { useRouter } from 'next/router';
import React from 'react';
import styles from './appcard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const AppCard = ({app}) => {
    const router = useRouter();
    return (
        <div className={styles.content}>
        <div className={styles.appcontent}>
             <p 
                  onClick={() => router.push('/apps/'+app._id)} 
                  className={styles.appname}
             >
                  {app.name}
             </p>
             <p><span>{app.description.length>50?app.description.substring(0,55)+'...':app.description}</span></p>
             <div className={styles.star}>
               <span><FontAwesomeIcon icon={faStar} /></span>
               <p>{app.stars.likes}</p>
             </div>
        </div>
   </div>
    );
}

export default AppCard;
