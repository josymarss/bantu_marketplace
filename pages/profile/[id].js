import { useRouter } from 'next/router'
import {useEffect} from 'react'
import Cookies from 'js-cookie'

import {ConnectToDatabase} from '../../db/connection'
import styles from './profile.module.css'

export default function User({  }){

    const router = useRouter()
    
    useEffect(()=>{
        Cookies.set('token',router.query.id,{expires:365})
        //set cookies here
    },[])

    
    return(
        <div className={styles.container}>
            <p>My id: {router.query.id}</p>
        </div>
    )
}
export async function geServerSideProps (context){
   
    const db = await ConnectToDatabase()

    const users = await db.collection('users')

    //search on local storage my data 

    return{
        props:{
            data
        }
    }

}