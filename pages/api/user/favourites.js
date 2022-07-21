import { ObjectId } from 'mongodb';
import { ConnectToDatabase } from '../../../db/connection';

export default async function (req, res){
    const {myId, appId} = req.body
    const db = await ConnectToDatabase();
    const httpMethod = req.method;

    const apps = await db.collection('apps');
    const users = await db.collection('users');
    const  app = await apps.findOne({_id: ObjectId(appId)});
    const user = await users.findOne({_id: ObjectId(myId)});

    const {favourites} = user;
    const appExist = favourites.filter(ob => ob.id === appId);

    
    if(httpMethod === 'POST'){

        if(appExist.length > 0){
            const newValue = favourites.filter(ob => ob.id !== appId);
            await users.updateOne({_id: ObjectId(myId)}, {$set:{"favourites": newValue}});
            return res.send({value: false});
        } 
        await users.updateOne({_id: ObjectId(myId)}, {$push:{"favourites": {id: appId, app}}});
        return res.send({value: true});
    }

    if(httpMethod === 'PUT'){

        if(appExist.length > 0) return  res.send({value: true});
        return res.send({value: false});
           
    }


}
