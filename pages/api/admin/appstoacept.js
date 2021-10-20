import { ConnectToDatabase } from "../../../db/connection";

export default async(req,res) =>{
    
    const db = await ConnectToDatabase()
    const appstoacept = await db.collection('appstoacept')
    const method = req.method

    // Aicionado pelo usuario      
    if(method === 'POST'){
        const { 
            name,
            description,
            link,
            reactions,
            photo,
            negociations,
            myId
         } = req.body 
        const result = await appstoacept.insertOne({
         name, description,link,reactions,negociations,myId
    })
        result ? res.send({message:'inserido com sucesso', seggestion:'sucess'}) : '' 
    }

}