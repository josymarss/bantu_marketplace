import { ObjectId } from 'mongodb';
import { ConnectToDatabase } from '../../../db/connection';

export default async (req,res) => {
    const db = await ConnectToDatabase();
    const apps = await db.collection('apps');
    const users = await db.collection('users');
    const notification = await db.collection('notification');
    const negotiation = await db.collection('negotiation');
    const { _id,titulo,description, idUser,dataLimite,percent }  = req.body;

    const user = await users.findOne({_id:ObjectId(idUser)});
    
    //Adicionar negociacao do respectivo app
   if(req.method ==='POST'){
        const date = new date();
        const dia = date.getDate();
        const mes = date.getMonth() +1;
        const ano = date.getFullYear();
        const { followers, avatar, name } = user;

        const result = await negotiation.insertOne({ 
                _id: new ObjectId(), 
                titulo, 
                description, 
                idUser, 
                nameuser:name, 
                useravatar:avatar,
                percent,
                dataLimite,
                datadanegociacao: dia+'/'+mes+'/'+ano
            });
    
    const app = await apps.findOne({ _id:ObjectId(_id) });
    //Colocar notificacao no dono do app

    await notification.insertOne({
        userId:app.userId,
        appname:app.name,
        not:app.name+' foi iniciada uma nova negociação.'
  });
   //Adicionar negociacao solicitada, nos meus dados de solicaitados
    const {negociations} = app;
    const idnegociation = negociations.filter(neg => neg._id ? idUser == neg.idUser: '');
    
   
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
   res.send({data:'done'});
}