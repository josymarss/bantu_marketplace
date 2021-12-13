import {ConnectToDatabase} from '../../../db/connection';

export default async (req,res) => {
      const db = await ConnectToDatabase();
      const users = await db.collection('users');
      const data = req.body.data;

      const result = await users.findOne({
            $or:[
                  { "name":data },
                  { "fullName": data }
            ]
      });
      console.log(result);
      res.send({result});

}