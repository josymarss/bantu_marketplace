import {useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'

import Activities from '../activities/activities'
import MyApps from '../apps/myapps'
import MostPopular from '../apps/mostpopular'
import Search from '../search/search'

import styles from './feed.module.css'

export default function Feed(){

     const fakeData = [1,2,1,2,3,1,2,3,1,2]

     return(
          <div className={styles.feed}>
               <div className={styles.container}>  
                    <div className={styles.myApps}>
                         <p>Aplicativos em alta</p>
                         <MyApps />
                    </div>
                    <div className={styles.activities}>
                         <Search />
                         {fakeData.map(item => 
                              <div className={styles.card}>
                                   <Activities />
                              </div>
                         )}
                    </div>
                    <div className={styles.mostPopular}>
                         <p>Mais populares</p>
                         <MostPopular />
                    </div>
               </div>
          </div>
     );
}

const getServerSideProps = async () => {

}
