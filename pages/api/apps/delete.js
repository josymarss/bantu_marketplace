import { ObjectId } from 'mongodb';
import { ConnectToDatabase } from '../../../db/connection';

export default async (req,res) => {
        const db = await ConnectToDatabase();
        const apps = await db.collection('apps');
        const method = req.method;
        const { id } = req.body;
        await apps.deleteOne({_id:ObjectId(id)});
        res.send(true);
    
} 