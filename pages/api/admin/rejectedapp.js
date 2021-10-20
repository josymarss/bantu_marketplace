import { ObjectId } from "bson";
import { ConnectToDatabase } from "../../../db/connection";

export default async (req,res) => {

    const db = await ConnectToDatabase()

    const { name, description, link, reactions,negociations, myId } = req.body
    const method = req.method;
    const appstoacept = await db.collection('appstoacept')

    if(method === 'POST'){   // Usei o metodo POST porque o DELETE estava dar muitos erros
     
        const  { name,  description,  link,  reactions,  negociations, myId} = req.body
        const result = await appstoacept.deleteOne({'name': name})
        result ? res.send({message:' eliminado com sucesso', seggestion:'sucess'}) : '' 
    }



}
