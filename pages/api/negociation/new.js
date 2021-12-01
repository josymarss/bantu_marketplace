import { ObjectId } from 'mongodb';
import { ConnectToDatabase } from '../../../db/connection';

export default async (req,res) => {
    const db = await ConnectToDatabase();
    const apps = await db.collection('apps');
    const { _id,titulo,description, idUser }  = req.body;

    const result = await apps.updateOne(
        { _id:new ObjectId(_id) }, 
        {$push: { negociations:{titulo, description, idUser} }}
    );
    const app = await apps.findOne({ _id:new ObjectId(_id) });
    // Adicionar actividade no feed dos meus seguidores 
    //bucar meus seguidores 
    const users = await db.collection('users');
    const user = await users.findOne({_id:new ObjectId(idUser)});
    const { followers, avatar, name } = user;

    //adicionar no feed deles
    followers.map(async id => {
        const result = await users.updateOne(
            { _id:new ObjectId(id) },
            { $push:{
                    feed:{
                        name,
                        avatar,
                        app,
                    }
                }
            });
            console.log(result);
    });
    res.send(result);
}