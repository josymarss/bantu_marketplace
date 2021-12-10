import { ObjectId } from 'mongodb';
import { ConnectToDatabase } from '../../../db/connection';

export default async (req,res) => {
    const db = await ConnectToDatabase();
    const apps = await db.collection('apps');
    const users = await db.collection('users');
    const { _id,titulo,description, idUser }  = req.body;

    const user = await users.findOne({_id:new ObjectId(idUser)});
    const { followers, avatar, name } = user;
    //Adicionar negociacao do respectivo app
    const result = await apps.updateOne(
        { _id:new ObjectId(_id) }, 
        {$push: { 
            negociations:{
                _id: new ObjectId(), 
                titulo, 
                description, 
                idUser, 
                nameuser:name, 
                useravatar:avatar
            } 
        }}
    );
    const app = await apps.findOne({ _id:new ObjectId(_id) });

    // Adicionar negociacao solicitada nos meus dados
    const negImade = await users.updateOne({_id:new ObjectId(idUser)},{
       $push: {negociationsimade:{ titulo, description, idoftheapp:_id }}
    });

    // Adicionar actividade no feed dos meus seguidores 
    //bucar meus seguidores 
    //adicionar no feed deles
    followers.map(async id => {
        const result = await users.updateOne(
            { _id:new ObjectId(id) },
            { $push:{
                    feed:{
                        iduser:id,
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