import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare,faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import styles from './Header.module.css';

export default function Header( {user} ){
      const router = useRouter();
      const [myId, setId] = useState('');

      useEffect(() =>{
            setId(sessionStorage.getItem('tokenId'));
      },[]);

      const onLogOut = () =>{
            sessionStorage.removeItem('tokenId');
            sessionStorage.clear();
            router.push('/account/login');
      }
      return (
            <nav className={styles.menu}>
                  <h5><Link href='/leading/leading'>bantu-marketplace</Link></h5>
                  <div className={styles.menuElements}>
                        <ul>
                              <li><Link href={myId ? `/feed/${myId}` : '/'}>Home</Link></li>
                              <li ><Link href='/apps/listingapps'>Aplicativos</Link></li> 
                              <li><Link href={myId ? `/profile/${myId}`: '/'} >Perfil</Link></li>
                         </ul>
                  </div>
                  <div className={styles.add}>
                        {myId ?<>
                        <div className={styles.addnewapp}>
                              <span>
                              <Link href={`/apps/newapp`}>
                                    <FontAwesomeIcon icon={faPlusSquare} />
                              </Link>
                              </span>
                        </div>
      
                        <div className={styles.notifications}>
                              <span>
                              <Link href={`/negociation/allnegociations/${myId}`}>
                                    <FontAwesomeIcon icon={faBell} />
                              </Link>
                              </span>
                        </div>
                        <p className={styles.logout} onClick={onLogOut}>{myId ? 'Logout': 'Login'}</p>     
                        </>: 
                        ''}
                  </div>
            </nav>
      );
}