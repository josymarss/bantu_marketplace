import {useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'

import Activities from '../activities/activities'
import MyApps from '../apps/myapps'
import MostPopular from '../apps/mostpopular'
import Search from '../search/search'

import styles from '../../styles/feed.module.css'

export default function Feed(){
     return(
          <div className={styles.feed}>
               <Search />
               <div className={styles.container}>
                  
                    
                    <div className={styles.myApps}>
                         <MyApps />
                    </div>

                    <div className={styles.activities}>
                         <Activities />
                    </div>

                    <div className={styles.mostPopular}>
                         <MostPopular />
                    </div>
               </div>
          </div>
     );
}

