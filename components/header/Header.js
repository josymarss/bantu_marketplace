import { useState, useEffect, useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare,faBell, faBars, faHome,faTablet,faUser,faInfo,faSearch,faWindowClose } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';
import {RefreshMenuContext} from '../../pages/_app'

{/* <FontAwesomeIcon icon="fal fa-badge-dollar" />  negociation*/}
{/* <FontAwesomeIcon icon="fal fa-users" /> follors */}
{/* <FontAwesomeIcon icon="fal fa-code" />  app*/} 


export default function Header( {user} ){
      const router = useRouter();
      const {refreshMenu, setRefreshMenu} = useContext(RefreshMenuContext);
      const [myId, setId] = useState('');
      const [showMenu, setShowMenu] = useState(true);
      const navWidthRef = useRef();
      const [navWidth, setNavWidth] = useState()
      
      const getSize = ()=>{
            const newWidth = navWidthRef.current.clientWidth;
            setNavWidth(newWidth);
            if(navWidth >= 768) {setShowMenu(true);}
      }
      useEffect(()=>{getSize()}, [])
      useEffect(() =>{
            setId(sessionStorage.getItem('tokenId'));
            window.addEventListener('resize', getSize);
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
      const handlerClick = () =>{
            if(showMenu) return setShowMenu(false)
            return setShowMenu(true)
      }
      const ItemMenuLabel = ({showMenu, title}) =>{
            return(
            <>    
            {
            showMenu ? '' : 
                  <span className={styles.itemMenuLabel}>
                  {title}
                  </span>
            }
            </>
            )  
      }
      const HeaderMenu = () => (
            <nav ref={navWidthRef} className={styles.menu} >
                  <div className={styles.title}>
                        <h1>
                              <Link href={selectPath('/leading/leading', myId)}>bantu-marketplace</Link>
                        </h1>
                  </div>
                  <div className={styles.menuElements}>
                      { myId? <ul>
                              <li><Link href={selectPath('/feed/', myId)}><FontAwesomeIcon icon={faHome} /></Link></li>
                              <li ><Link href={selectPath('/apps/listingapps', myId)}><FontAwesomeIcon icon={faTablet}/></Link></li> 
                              <li><Link href={selectPath('/profile/', myId)} ><FontAwesomeIcon icon={faUser} /></Link></li>
                              <li><Link href={selectPath('/terms', myId)} ><FontAwesomeIcon icon={faInfo} /></Link></li>
                         </ul>
                       : '' }
                  </div>
                  <div className={showMenu ? styles.add : styles.showMenuAdd}>
                        {myId ?<>
                        {showMenu? '': 
                              <div  className={styles.closeWindow}>
                                    <span onClick={handlerClick}>
                                          <FontAwesomeIcon icon={faWindowClose} />      
                                    </span> 
                              </div>
                        }
                        <div className={styles.search} >
                              <Link href={`/profile/usuarios`}>
                                    <span >
                                          <FontAwesomeIcon className={styles.searchIcon} icon={faSearch} />
                                          <ItemMenuLabel showMenu={showMenu} title="Pesquisar"/>
                                    </span>
                              </Link>
                        </div>
                        <div className={styles.addnewapp} >
                              <Link href={`/apps/newapp`}>
                                    <span>
                                          <FontAwesomeIcon icon={faPlusSquare} />
                                          <ItemMenuLabel showMenu={showMenu} title="Adicionar app"/>
                                    </span>
                              </Link>
                        </div>
      
                        <div className={styles.notifications}>
                              <Link href={`/negociation/allnegociations/${myId}`}>
                                    <span>
                                          <FontAwesomeIcon icon={faBell} />
                                          <ItemMenuLabel showMenu={showMenu} title="Notificações"/>         
                                    </span>
                              </Link>
                        </div>
                        <p className={styles.logout} onClick={onLogOut}>
                              {myId ? 'Logout': 'Login'}
                        </p>     
                        </>   : ''}
                  </div>
                  {myId ? 
                  <div className={styles.menuItem}> 
                              <FontAwesomeIcon icon={faBars} onClick={handlerClick} />
                        </div> : ''
                  }
            </nav>
      ) 
      return (
            <HeaderMenu />
      );
}