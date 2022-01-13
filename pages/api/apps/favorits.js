import { ConnectToDatabase } from "../../../db/connection";
import { ObjectId } from "mongodb";

export default async(req,res) =>{
      const db = await ConnectToDatabase();
      const favorits = await db.collection('favorits');

      const method = req.method;

      // const { idapp } = req.body;

      switch(method){
            case 'POST':
                  const {id} = req.body;
                  // const { idapp } = req.body;
                  await favorits.insertOne({idapp:id});

            break;
            case 'PUT':
                  // const { id } = req.body;
                  // await favorits.deleteOne({idapp});

            break;
      }


}