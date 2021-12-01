import { ObjectId } from 'mongodb';
import  { ConnectToDatabase } from '../../../db/connection';

export default async (req,res)=>{
      const db = await ConnectToDatabase();
      const {token} = req.body;

      const user = await db.collection('users').findOne({_id:new ObjectId(token)});
      console.log(user);
      res.send(user);
}
