import { ObjectId } from 'mongodb';
import { ConnectToDatabase } from '../../../db/connection';

export default async (req,res) => {
     const {myId, appId} = req.body
     const db = await ConnectToDatabase();
     const httpMethod = req.method;

     if(httpMethod === 'POST'){
        const apps = await db.collection('apps');
        const  app = await apps.findOne({_id: ObjectId(appId)});

        const userExist = app.stars.usersid.includes(myId);

        if(!userExist){
               await apps.updateOne({_id: ObjectId(appId)}, {$push:{"stars.usersid":myId }});
               const stars = app.stars.usersid.length +1;
               await apps.updateOne({_id: ObjectId(appId)}, {$set:{"stars.likes": stars}});
               return res.send({like: +1});
        } else {
               const newUser = app.stars.usersid.filter(ele=> ele !== myId);
               await apps.updateOne({_id: ObjectId(appId)}, {$set:{"stars.usersid":newUser}});
               const stars = app.stars.usersid.length -1;
               await apps.updateOne({_id: ObjectId(appId)}, {$set:{"stars.likes": stars}});
               return res.send({like: -1});
        }
     }
}