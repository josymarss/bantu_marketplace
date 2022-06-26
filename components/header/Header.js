import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare,faBell, faHome,faTablet,faUser,faInfo,faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';
import {RefreshMenuContext} from '../../pages/_app'

export default function Header( {user} ){
      const router = useRouter();
      const {refreshMenu, setRefreshMenu} = useContext(RefreshMenuContext);
      const [myId, setId] = useState('');
  

      useEffect(async () =>{
            setId(sessionStorage.getItem('tokenId'));
      },[router.isReady, refreshMenu]);

      const onLogOut = async () =>{
            sessionStorage.removeItem('tokenId');
            sessionStorage.clear();
            setRefreshMenu(v => v +1)
            router.push('/account/login');     
      } 
      
      const selectPath = (path, id) => {
            const setPath = `${path}`
                  if(path === '/feed/' && id) return `${setPath}${id}` 
                  if(path == '/apps/listingapps' && id) return setPath
                  if(path === '/profile/' && id) return setPath+id
                  if(path === '/terms' && id) return setPath
                  if(path === '/leading/leading'){
                        if(id) return `/feed/${myId}`
                        else return '/leading/leading'
                  }
                  return '/account/login'           
      }
      const HeaderMenu = () => (
            <nav className={styles.menu}>
                  <h1><Link href={selectPath('/leading/leading', myId)}>bantu-marketplace</Link></h1>
                  <div className={styles.menuElements}>
                      { myId? <ul>
                              <li><Link href={selectPath('/feed/', myId)}><FontAwesomeIcon icon={faHome} /></Link></li>
                              <li ><Link href={selectPath('/apps/listingapps', myId)}><FontAwesomeIcon icon={faTablet}/></Link></li> 
                              <li><Link href={selectPath('/profile/', myId)} ><FontAwesomeIcon icon={faUser} /></Link></li>
                              <li><Link href={selectPath('/terms', myId)} ><FontAwesomeIcon icon={faInfo} /></Link></li>
                         </ul>
                       : '' }
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