import {ConnectToDatabase} from '../../../db/connection';
import avatar from '../../../profilepicture';

export default async (req,res) => {
    const db = await ConnectToDatabase();

    const { name, description,link,stars,photo,negociations, myId } = req.body;
    avatar = photo
    const apps = await db.collection('apps');
    const appResult = await apps.insertOne(
        { userId:myId, name,description,avatar, link,stars,negociations }
    );
    res.send(appResult.ops[0]);
         
}