import { ObjectId } from 'mongodb';
import { ConnectToDatabase } from '../../../db/connection';

export default async (req,res) => {
    const db = await ConnectToDatabase();
    const apps = await db.collection('apps');
    const users = await db.collection('users');
    const { _id,titulo,description, idUser }  = req.body;

    const user = await users.findOne({_id:ObjectId(idUser)});
    
    //Adicionar negociacao do respectivo app
   if(req.method ==='POST'){
    const { followers, avatar, name } = user;
    const result = await apps.updateOne(
        { _id:ObjectId(_id) }, 
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
    const app = await apps.findOne({ _id:ObjectId(_id) });
    const {negociations} = app;
    const idnegociation = negociations.filter(neg => neg._id ? idUser == neg.idUser: '');
    
    //Adicionar negociacao solicitada nos meus dados
    const negImade = await users.updateOne({_id:new ObjectId(idUser)},{
       $push: {negociationsimade:{ titulo, description, idoftheapp:_id,idnegociation:idnegociation[0]._id }}
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
    });
    res.send(result);
   }
   if(req.method ==='PUT'){
       
   }
}