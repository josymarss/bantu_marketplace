import { ObjectId } from 'mongodb';
import { ConnectToDatabase } from "../../../db/connection";

export default async (req,res) => {
      const db = await ConnectToDatabase();
      const users = await db.collection('users');
      const apps = await db.collection('apps');
      const aceptednegociations = await db.collection('acepted');

      const method = req.method;

      const {negociation,myId,idapp} = req.body;
      const {description,idUser,titulo} = negociation;
      
      switch(method){
            case 'PUT':
                  res.send('something'); 
            break

            case'POST': 
            //Buscar o App 
            const acepetedApp = await apps.findOne({_id:ObjectId(idapp)});
            const usersolicitou = await users.findOne({_id:ObjectId(idUser)});
            //verifica se já existe tal negociação seguidores
                  const alredyThere = await aceptednegociations.findOne({
                        _id:ObjectId(idapp),
                  });
                  if(!alredyThere){
                        await aceptednegociations.insertOne({
                              idapp,
                              acepetedApp,
                              idproprietario:myId,
                              usuariosolicitante:usersolicitou,
                              titulo,
                              description, 
                        });
                  }

                  //Apagar o aplicativo
                  await apps.deleteOne({_id:ObjectId(idapp)});
                  res.send({result:'apagado'});
            break;

            case 'DELETE':
                  const result = await apps.updateOne({"negociations._id":negociation._id},{
                        $pull:{
                              "negociations._idUser":idUser
                        }
                  });
                  result ? res.send({result:'apagado'}) : null ;
            break;
      }
}