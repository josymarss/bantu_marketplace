import { ObjectId } from 'mongodb';

import {ConnectToDatabase} from '../../../db/connection'

export default async (req,res) => {
      const db = await ConnectToDatabase();
      const method = req.method;

      switch(method){
            case 'POST' :const id = req.body.id;
                  await db.collection('apps').deleteOne({_id:ObjectId(id)});
                  res.send({delted:true});
            break;

            case 'PUT' :
            break;

            case 'DELETE' :
                  
            break;
      }

}