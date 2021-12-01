import {ObjectId} from 'mongodb';

import { ConnectToDatabase } from "../../../db/connection"

export default async(req,res) =>{
    const db = await ConnectToDatabase();
    const users = await db.collection('users');
    let state = false;
    const { myId, idUserWhoIwantToFollow } = req.body;
    const method = req.method;

    if (method === 'PUT'){
        const result = await users.findOne(
            { _id:new ObjectId(idUserWhoIwantToFollow)},
        );
        const {followers} = result;
        const isAlredyThere = followers.filter(id => id == myId);
        if(isAlredyThere.length == 0){
            await users.updateOne(
                {_id:new ObjectId(idUserWhoIwantToFollow)},
                {$push:
                    {followers:myId}
                }
            );
            state = true;
            res.send(state); 
        }else{
           await users.updateOne(
                {_id:new ObjectId(idUserWhoIwantToFollow)},
                {$pull:
                    {followers:myId}
                }
            );
            state= false;
            res.send(state);
        }
    }
}
