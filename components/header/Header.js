import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare,faBell, faHome,faTablet,faUser,faInfo } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// import {ObjectId} from 'mongodb';

// import {ConnectToDatabase} from '../db/connection';
import styles from './Header.module.css';

export default function Header( {user} ){
      const router = useRouter();
      const [myId, setId] = useState('');
      const [notifications,setNot] = useState();
      const [statusMenu,setStatus] = useState([]);
      useEffect(() =>{
            setId(sessionStorage.getItem('tokenId'));
      },[]);
      useEffect(() => { HeaderMenu() },[statusMenu])

      const onLogOut = async () =>{
            router.push('/account/login');
            resultNotifications = await axios(`/api/apps/noti`,{myId});
            setNot(resultNotifications.data);
      } 

      const ChangeStatus = (e) => {
            for(let i=0; i<statusMenu.length; i++){
                  if (i === e) {
                        statusMenu[i] = true;
                  }
                  statusMenu[i] = false;
            }
      }
      
      const HeaderMenu = () => (
            <nav className={styles.menu}>
                  <h5><Link href='/leading/leading'>bantu-marketplace</Link></h5>
                  <div className={styles.menuElements}>
                        <ul>
                              <li><Link href={myId ? `/feed/${myId}` : '/'}><FontAwesomeIcon icon={faHome} className={statusMenu[0]?styles.active:''} onClick={() => ChangeStatus(0)}/></Link></li>
                              <li ><Link href='/apps/listingapps'><FontAwesomeIcon icon={faTablet} className={statusMenu[1]?styles.active:''}onClick={() => ChangeStatus(1)}/></Link></li> 
                              <li><Link href={myId ? `/profile/${myId}`: '/'} ><FontAwesomeIcon icon={faUser} className={statusMenu[2]?styles.active:''}onClick={() => ChangeStatus(2)}/></Link></li>
                              <li><Link href={`/terms`} ><FontAwesomeIcon icon={faInfo} className={statusMenu[3]?styles.active:''}onClick={() => ChangeStatus(3)}/></Link></li>
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
                              <p>{notifications}</p>
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
