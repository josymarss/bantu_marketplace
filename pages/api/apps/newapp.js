import { ConnectToDatabase } from "../../../db/connection"

export default async (req,res) => {

    const db = ConnectToDatabase()
    const method = req.method
    const { myId,...app } = req.body
    
    if(method ==='POST'){
        const users = await db.collection('users')
        const alredyExist = await users.find({}, {_id:myId, "apps.name":app.name})
        if(alredyExist !== null || alredyExist !== undefined){
            res.send({
                message:'Nome de aplicativo existente',
                sugestion:'Tente usar outro nome'
            })
            return
        }
        const result = await users.updateOne(
            {_id:myId}, 
            { $set:{ apps:{ $push:{ app } } } }
        )
        console.table(result)
    }


}