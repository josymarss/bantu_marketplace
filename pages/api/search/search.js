import {ConnectToDatabase} from '../../../db/connection';

export default async (req,res)  =>{
    const db = await ConnectToDatabase();
    const apps = await db.collection('apps');
    const {controlText} = req.body;
    const result = await apps.find({name:controlText}).toArray();
    res.send({result});
}