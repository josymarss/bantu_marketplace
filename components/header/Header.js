import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare,faBell, faHome,faTablet,faUser,faInfo,faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import styles from './Header.module.css';

export default function Header( {user} ){
      const router = useRouter();
      const [myId, setId] = useState('');

      useEffect(async () =>{
            setId(sessionStorage.getItem('tokenId'));
            
      },[router.isReady]);

      const onLogOut = async () =>{
            sessionStorage.removeItem('tokenId');
            sessionStorage.clear();

            router.push('/account/login');
            
      } 
      
      const HeaderMenu = () => (
            <nav className={styles.menu}>
                  <h5><Link href='/leading/leading'>bantu-marketplace</Link></h5>
                  <div className={styles.menuElements}>
                        <ul>
                              <li><Link href={myId ? `/feed/${myId}` :'/leading/leading'}><FontAwesomeIcon icon={faHome} /></Link></li>
                              <li ><Link href='/apps/listingapps'><FontAwesomeIcon icon={faTablet}/></Link></li> 
                              <li><Link href={myId ? `/profile/${myId}` : '/account/login'} ><FontAwesomeIcon icon={faUser} /></Link></li>
                              <li><Link href={`/terms`} ><FontAwesomeIcon icon={faInfo} /></Link></li>
                         </ul>
                  </div>
                  <div className={styles.add}>
                        {myId ?<>
                        <div className={styles.addnewapp}>
                              <span >
                                    <Link href={`/profile/usuarios`}>
                                          <FontAwesomeIcon className={styles.searchIcon} icon={faSearch} />
                                    </Link>
                              </span>
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
                              <p>{0}</p>
                        </div>
                        <p 
                              className={styles.logout} 
                              onClick={onLogOut}
                        >
                                    {myId ? 'Logout': 'Login'}
                        </p>     
                        </>: 
                        ''}
                  </div>
            </nav>
      ) 
      return (
            <HeaderMenu />
      );
}