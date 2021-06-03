import {useState, useEffect} from 'react';
import {Link, useRouter}from 'next/router'

export default function Header(){
      useEffect(() =>{
            
      })
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
                        <li>Home</li>
                  </ul>
                  
                  <p onClick={makeLogin}>
                        <Link href={}></Link>{logedIn? 'Login' : 'Log out'}</p>

            </nav>
      );
}
