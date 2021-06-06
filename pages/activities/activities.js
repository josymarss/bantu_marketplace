import { useEffect, useState } from 'react' 
import { useRouter } from 'next/router'
import { Link } from 'next/link'
import Image from 'next/Image'

import styles from './activities.module.css'
import Reactions from './reactions'
import User from './user'
import App from '../apps/app'

function Activity(){
      return(
      <div className={styles.container}>
            <User/>
            <hr className={ styles.hr }/>
            <App name='Palanxel'description='a popular app in angola to make sure bl[a bl[a'/>
            <Reactions />            
      </div>
      )
}
export default function Activities({user}){
      // const data = user.
      const [post,setPost] = useState({})
   

      useEffect(() =>{

      },[post])

      const onNegociar = () =>{
            
      }
      
   return(
      <Activity />
   )
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