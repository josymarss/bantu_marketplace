import { ConnectToDatabase } from "../../../db/connection";

export default async(req,res) =>{
    
    const db = await ConnectToDatabase()
    const method = req.method
    const { 
            name,
            description,
            link,
            reactions,
            photo,
            negociations,
            myId
         } = req.body 
         
    if(method === 'POST'){
        const appstoacept = await db.collection('appstoacept')
        const result = await appstoacept.insertOne({
         name, description,link,reactions,negociations,myId
    })
        result ? res.send({message:'inserido com sucesso', seggestion:'sucess'}) : '' 
    }

}