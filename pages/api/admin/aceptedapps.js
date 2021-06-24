import { ConnectToDatabase } from "../../../db/connection";

export default async (req,res) => {
    
    const db = await ConnectToDatabase()
    const { myId, ...app } = req.body

    if(method === 'POST'){

        const aceptedapps = await db.collection('aceptedapps')
        const insertedIntoAceptedApps = await aceptedapps.insertOne({myId,app})

        const users = await db.collection('users')
        const insertedIntoUsers = await users.updateOne(
            { _id:myId }, 
            {$set:{apps:{ $push:{app} } } }
        )
        
        if(!(insertedIntoUsers && insertedIntoAceptedApps)){
            res.send({
                messge:'Ocorreu algum erro',
                sugestion:'verifique sua internet'
            })
            return 
        }
        console.log(result)
        res.send({message:'Inserido com sucesso!'})
    }
    if(method === 'DELETE' ){
        const deleted = await db.collection('aceptedapps').deleteOne( {myId, app })
        console.table(deleted)
    }
}



