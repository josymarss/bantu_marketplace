import {useState, useEffect} from 'react';
import {useRouter}from 'next/router'
import Link from 'next/link'

import styles from './Header.module.css'

export default function Header(){

      const [logedIn, setLogin] = useState(false)

      const makeLogin = () =>{
            //search on local storage
            if(!logedIn){
                  //Login here
            }else{
                  //Sign out
            }
      }
      return (
                  <nav className={styles.menu}>
                        <h5>bantu-marketplace</h5>
                        <div className={styles.menuElements}>
                              <ul>
                                    <li><Link href='/feed/feed'>Home</Link></li>
                                    <li><Link href='/'>Aplicativos</Link></li>
                                    <li><Link href='/profile/profile'>Perfil</Link></li>
                              </ul>
                        </div>
                        <p>{!logedIn? ' ' : '@josymars'}</p>
                  </nav>
      );
}
