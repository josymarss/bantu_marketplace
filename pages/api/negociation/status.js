import { faCaretSquareUp } from "@fortawesome/free-solid-svg-icons";
import { ConnectToDatabase } from "../../../db/connection";

export default async (req,res) => {
      const db = await ConnectToDatabase();
      const apps = await db.collection('apps');
      const aceptednegociations = await db.collection('acepted');

      const method = req.method;

      const {negociation,myId,idapp} = req.body;
      const {description,idUser,titulo} = negociation;
      
      switch(method){
            case 'PUT':

            break

            case'POST': 
            //verifica se já existe tal negociação seguidores
            const alredyThere = await aceptednegociations.findOne({
                  idapp,
                  idproprietario:myId,
                  idsolicitante:idUser,
                  description,
                  titulo
            });
            //aceitou
            if(!alredyThere){
                  const result = await aceptednegociations.insertOne({
                        idapp,
                        idproprietario:myId,
                        idsolicitante:idUser,
                        description,
                        titulo
                  });

            }
            //gerar pdf // aqui
            
            //Mudar o status do aplicativo aceitado

            break;

            case'DELETE':
                  await apps.deleteOne({
                        negociations:{description,idUser,titulo}
                  });
                  res.send(true);
            break;
      }
}