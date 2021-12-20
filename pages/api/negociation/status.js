import { ObjectId } from 'mongodb';
import { ConnectToDatabase } from "../../../db/connection";

export default async (req,res) => {
      const db = await ConnectToDatabase();
      const users = await db.collection('users');
      const apps = await db.collection('apps');
      const aceptednegociations = await db.collection('acepted');
      const notification = await db.collection('notification');
      let newApp

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
                              newApp = appINeed.negociations.filter(neg => neg._id != idnegociation
                              );
                        }
                  }
                  await apps.updateOne({ _id:appINeed._id },{
                        $set: { negociations: { ...newApp } }
                  });
                  await notification.insertOne({
                        iduser:newApp.idUser,
                        appname:newApp.name,
                        not:newApp.name+' Foi redefinido os termos',
                        description:desc
                  });


            //     const { negociations } = appINeed;
                
                //Colocar novos termos da negociacao 

                /*Colocar de volta os dados alterados no 
                array de negociacao do aplicativo em questao*/

                //Colocar nas notificacoes de cada user

                //Como funciona as notificacoes:
                  //Adiciona um array de notificacoes em cada users
                  //Nesse array contem apenas o di de cada negociacao
                  //Em cada mexida notifica o dono e o que solicitou
            break;

            case'POST': 

            const {negociation,myId,idapp} = req.body;
            const {description,idUser,titulo} = negociation;
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