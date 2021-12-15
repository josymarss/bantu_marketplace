import {ConnectToDatabase} from '../../../db/connection';

export default async (req,res) => {
      const db = await ConnectToDatabase();
      const users = await db.collection('users');
      const apps = await db.collection('apps');
      const data = req.body.data;
      //delete indexes 

      //Create indexes for any fileds
      users.createIndex({ name:'text' ,fullName:'text', });
      apps.createIndex({ name: 'text', categoria: 'text' } );
      
      const resultApps = await apps.find({
            $text: { $search: data }
      }).toArray();

      const resultUsers = await users.find({
            $text: { $search: data }
      }).toArray();

      res.send({resultUsers,resultApps});
}