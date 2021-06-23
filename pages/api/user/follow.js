import { ConnectToDatabase } from "../../../db/connection"

export default async(req,res) =>{
    const db = await ConnectToDatabase()
    const myId = req.body
    const method = req.method
    if (method === 'PUT' && !!myId){
        const isAlredyThere = await db.users.findOne(
            {_id: idUserwhoIwantToFollow }, { followres: {_id: myId} }
        )
        if(!isAlredyThere){
            await db.users.updateOne(
                { _id: idUserWhoIwantToFollow }, 
                { $set: { followers: { $push:{myId} } } }
            )
            res.send(true)
        } else{
            // await db.users.updateOne({_id:idUserWhoIwantToFollow},{followers: myId})
            res.send(false)
        }
    }
    res.status(200).send(
        {message:'Algum erro ocorreu'},
        {sugestion:'verifice sua internet'}
    ).json()
}
