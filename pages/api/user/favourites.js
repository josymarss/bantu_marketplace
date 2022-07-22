import { ObjectId } from 'mongodb';
import { ConnectToDatabase } from '../../../db/connection';

export default async function (req, res){
    const {myId, appId} = req.body
    const httpMethod = req.method;
    const db = await ConnectToDatabase();

    // Pick up the user
    const users = await db.collection('users');
    const user = await users.findOne({_id: ObjectId(myId)});
    const {favourites} = user;
    const appExist = favourites.filter(ob => ob.id === appId);
    
    if(httpMethod === 'POST' && !appId){
        const apps = favourites.reduce((acc, elem, index)=>{
                 acc[index] = elem.app
                 return acc;
          }, []);
        return res.status(200).send(apps);    
    } else {

    // Pick up the app
    const apps = await db.collection('apps');
    const  app = await apps.findOne({_id: ObjectId(appId)});

    if(httpMethod === 'POST'){

        if(appExist.length > 0){
            const newValue = favourites.filter(ob => ob.id !== appId);
            await users.updateOne({_id: ObjectId(myId)}, {$set:{"favourites": newValue}});
            return res.status(200).send({value: false});
        } 
        await users.updateOne({_id: ObjectId(myId)}, {$push:{"favourites": {id: appId, app}}});
        return res.status(200).send({value: true});
    }

    if(httpMethod === 'PUT'){

        if(appExist.length > 0) return  res.send({value: true});
        return res.status(200).send({value: false});
           
    }

    if(httpMethod === 'GET'){

        res.status(200).send({value: true});    
    }

    }
}
