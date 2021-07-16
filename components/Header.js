import {useState, useEffect} from 'react';
import {useRouter}from 'next/router'
import Link from 'next/link'

import styles from '../styles/header.module.css'

export default function Header(){

      const [logedIn, setLogin] = useState(false)

      const makeLogin = () =>{
            if(!logedIn){
                  //Login here
            }else{
                  //Sign out
            }
      }
      return (
            <nav className='menu'>
                  <h5>bantu marketplace</h5>
                  <ul>
                        <li><Link href='/'>Home</Link></li>
                        <li><Link href='/'>Projectos</Link></li>
                        <li><Link href='/'>Empresas</Link></li>
                        <li><Link href='/'>Acionistas</Link></li>
                        <li><Link href='/profile'>Perfil</Link></li>
                  </ul>
                  <p>{!logedIn? 'Login' : 'Log out'}</p>
            </nav>
      );
}
