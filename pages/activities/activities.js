import { useEffect, useState } from 'react' 
import { useRouter } from 'next/router'
import { Link } from 'next/link'
import Image from 'next/Image'

import styles from '../../styles/activities.module.css'
import Reactions from './reactions'
import User from './user'
import App from '../apps/app'


export default function Activities({user}){
      // const data = user.
      const [post,setPost] = useState({})
      
      useEffect(() =>{

      },[post])

      const onNegociar = () =>{
            
      }

   return(
         <>
            

            <User/>

            <hr className={ styles.hr }/>

            <App name='Palanxel'/>
            
            <Reactions />

         </>
   );
}
 const getServerSideprops = (context) =>{
      // take my data from local storage
      // after have my data, send to activities
      return{
            props:{
                  user:{user}      
            }
      }
 }