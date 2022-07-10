import { useState, useEffect, useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare,faBell, faBars, faHome,faTablet,faUser,faInfo,faSearch,faWindowClose } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';
import {RefreshMenuContext} from '../../pages/_app'


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
            showMenu 
            ? '' : 
             <span className={styles.itemMenuLabel}>
                  {title}
            </span>
            }
            </>
            )  
      }
      const handlerClickCloseSmallMenu = () => {
            if(showMenu) return;
            return setShowMenu(true)
      }
      const HeaderMenuInMiddle = ()=>{
            return (
                  <ul>
                  <li>
                        <Link  href={selectPath('/feed/', myId)}>
                             <span onClick ={handlerClickCloseSmallMenu}>
                              <FontAwesomeIcon icon={faHome} /> 
                              <span> {getSmallSize() ? '' : 'Home'}</span>
                             </span>
                        </Link>
                  </li>
                  <li>
                        <Link href={selectPath('/apps/listingapps', myId)}>
                              <span onClick ={handlerClickCloseSmallMenu}>
                              <FontAwesomeIcon icon={faTablet}/> 
                              <span> {getSmallSize() ? '' : 'Aplicativos'}</span>
                             </span>
                        </Link>
                  </li> 
                  <li>
                        <Link href={selectPath('/profile/', myId)}>
                              <span onClick ={handlerClickCloseSmallMenu}>
                              <FontAwesomeIcon icon={faUser} /> 
                              <span> {getSmallSize() ? '' : 'Perfil'}</span>
                             </span>
                        </Link>
                  </li>
                  <li>
                        <Link href={selectPath('/terms', myId)} >
                              <span onClick ={handlerClickCloseSmallMenu}>
                              <FontAwesomeIcon icon={faInfo} />
                              <span> {getSmallSize() ? '' : 'Termos de responsabilidade'}</span>
                             </span>
                        </Link>
                  </li>
            </ul> 
            )
      }
      const getSmallSize = () => navWidth >= 480;
      const HeaderMenu = () => (
            <nav ref={navWidthRef} className={styles.menu} >
                  <div className={styles.title}>
                        <h1>
                              <Link href={selectPath('/leading/leading', myId)}>bantu-marketplace</Link>
                        </h1>
                  </div>
                  <div className={styles.menuElements}>
                      { myId? 
                              <HeaderMenuInMiddle />
                        : ''
                        }
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
                         <div className={styles.headerMenuInMiddle}>
                              { getSmallSize() ? '' : <HeaderMenuInMiddle/> }
                        </div>
                        <div className={styles.search} >
                              <Link href={`/profile/search`}>
                                    <span onClick ={handlerClickCloseSmallMenu} >
                                          <FontAwesomeIcon className={styles.searchIcon} icon={faSearch} />
                                          <ItemMenuLabel showMenu={showMenu} title="Pesquisar"/>
                                    </span>
                              </Link>
                        </div>
                        <div className={styles.addnewapp} >
                              <Link href={`/apps/newapp`}>
                                    <span onClick ={handlerClickCloseSmallMenu}>
                                          <FontAwesomeIcon icon={faPlusSquare} />
                                          <ItemMenuLabel showMenu={showMenu} title="Adicionar app"/>
                                    </span>
                              </Link>
                        </div>
      
                        <div className={styles.notifications}>
                              <Link href={`/negociation/allnegociations/${myId}`}>
                                    <span onClick ={handlerClickCloseSmallMenu}>
                                          <FontAwesomeIcon icon={faBell} />
                                          <ItemMenuLabel showMenu={showMenu} title="Notificações"/>         
                                    </span>
                              </Link>
                        </div>
                        <p className={styles.logout} onClick={onLogOut}>
                              {myId ? 'Sair': 'Entrar'}
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