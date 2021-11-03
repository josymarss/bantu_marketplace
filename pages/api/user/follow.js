import { ConnectToDatabase } from "../../../db/connection"

export default async(req,res) =>{

    const db = await ConnectToDatabase()
    const { myId, idUserwhoIwantToFollow } = req.body
    const method = req.method

    if (method === 'PUT' && !!myId){
        const isAlredyThere = await db.users.findOne(
            {_id: idUserwhoIwantToFollow , followres:{$in:[myId]} }
        );
        if(!isAlredyThere){
            await db.users.updateOne(
                { _id: idUserWhoIwantToFollow }, 
                { $set: { followers: { $push: myId } } }
            );
            res.send(true);
        } else{
            res.send(false);;
        }
    }
}
