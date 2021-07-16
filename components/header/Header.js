import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Cookies from 'js-cookie'

import styles from './Header.module.css'

export default function Header(){

      const [logedIn, setLogin] = useState(false)
      //const [myId, updateMyId] = useState('')
      const router = useRouter()
      
      
      useEffect(() => {
           // myId = Cookies.get('tokenId')
           // myId !== '' ? setLogin(!logedIn) : setLogin(logedIn)

      },[])

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
                  <p onClick={() => !logedIn ? router.push('/account/login') : router.push(`/profile/${true}`)}>
                        {!logedIn? 'Login' : '@josymars'}
                  </p>
            </nav>
      );
}
