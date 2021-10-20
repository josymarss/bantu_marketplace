import { useState, useEffect } from 'react'

import { ConnectToDatabase } from '../../db/connection'
import general from './general.module.css'

export default function({data}){
    const [apps, updateApps] = useState()

    useEffect(() => {
        updateApps(JSON.parse(data))
        console.log(data)
    })

    return(
        <p>Hi</p>
    )
}

export const getServerSideProps = async () => {
    const db = await ConnectToDatabase()
    const users = db.collection('users')

    const data = await users.find({},{apps:1})
    console.log(data)

    return {
        props:{
            data:0 //JSON.stringify(data)
        }
        }
    }

