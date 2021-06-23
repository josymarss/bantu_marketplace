import { db } from '../../../db/connection'

import { ConnectToDatabase } from '../../../db/connection'

export default (req,res) => {
    
    const db = ConnectToDatabase()
    const  { negociation, nameApp, idUser, idUserOfApp }  = req.body
    const  method  = req.method

    if(method === 'POST'){
        const users = await db.collection('users')
        const result = await users.updateOne(
            { _id:idUserOfApp, name:nameApp }, 
            {$set:{apps:{ $push:{idUser,nameApp,negociation} } } }
        )
        console.log(result)
    }
    
}