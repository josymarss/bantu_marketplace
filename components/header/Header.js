import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'




import styles from './Header.module.css'

export default function Header(){

      const [logedIn, updateLogin] = useState(false)
      const [myId, updateMyId] = useState('')
      const [userName, updateUserName] = useState('')
      const router = useRouter()
      
      
      useEffect(() => {

            // console.log(sessionStorage.getItem('userDataLocal'));
              var userDataLocal = JSON.parse(sessionStorage.getItem('userDataLocal'))
            
             if(userDataLocal !== null) {
                  updateMyId(userDataLocal[0].id) 
                  updateUserName(userDataLocal[0].name)
             } else {
                    userDataLocal = ''
             }
             

            if(myId !== '' && myId !== null){
                  updateLogin(!logedIn) 
            }  else {
                  updateLogin(logedIn) 
            }
            
           
          

      }, [userName])

      const logout = ()=> {
            updateUserName('')
            updateMyId('')
            updateLogin(false)
            window.sessionStorage.clear()
             return router.push('/account/login')
            
      }

      return (
            <nav className={styles.menu}>
                  <h5>bantu-marketplace</h5>
                  <div className={styles.menuElements}>
                        <ul>
                              <li><Link href='/feed/feed'>Home</Link></li>
                              <li ><Link href='/apps/generalapps'>Aplicativos</Link></li> 
                              <li><Link href={`/profile/${myId}`} >Perfil</Link></li>
                        </ul>
                  </div>
                  <p onClick={() => !logedIn ? router.push('/account/login') : router.push(`/profile/${myId}`)}>
                                     {!logedIn  ? 'Login' : <span> <span className='span_logout' >{`${userName}`} </span> - <span onClick={()=> logout() }>Sair</span></span>  } 
                  </p>
            </nav>
      );
}
