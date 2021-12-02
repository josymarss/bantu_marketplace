import { ConnectToDatabase } from "../../../db/connection";
import {ObjectId} from 'mongodb';

export default async(req,res) => {
      const db = await ConnectToDatabase();

      const {id} = req.body;

      const apps = await db.collection('apps').find({userId:id}).toArray();
      console.log(apps);
}