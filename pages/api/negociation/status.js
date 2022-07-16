import { ObjectId } from 'mongodb';
import { ConnectToDatabase } from "../../../db/connection";

export default async (req,res) => {
      const db = await ConnectToDatabase();
      const users = await db.collection('users');
      const apps = await db.collection('apps');
      const aceptednegociations = await db.collection('acepted');
      const notification = await db.collection('notification');
      let newApp;
      let appIwant;

      const method = req.method;
      
      switch(method){
            case 'PUT':
                // receber os dados, idapp, idneg e iduser 
                const {idnegociation, desc} = req.body;
                //Buscar o aplicativo 
                  const appINeed = await apps.findOne({ negociations: {
                              $elemMatch: { _id:ObjectId(idnegociation) }
                        }
                  });
                  if(appINeed){
                        if(appINeed.negociations.length > 0){
                              newApp = appINeed.negociations.filter(neg => neg._id != idnegociation);
                        }
                        if(appINeed.negociations.length > 0){
                              appIwant = appINeed.negociations.filter(neg => neg._id == idnegociation);
                        }
                  }
                  await apps.updateOne({ _id:appINeed._id },{
                        $set: { negociations: [ ...newApp ] }
                  });
                  await notification.insertOne({
                        iduser:appIwant.idUser,
                        appname:appIwant.name,
                        not:appIwant.name+' Foi redefinido os termos',
                        not:desc
                  });
                  res.send(true);

            break;

            case'POST': 

            const {negociation,myId} = req.body;
            const {description,iduserdonodoapp,titulo,idapp} = negociation;
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
                              idsolicitante,
                              usuariosolicitantename,
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