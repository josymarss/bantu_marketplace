import { ObjectId } from "bson";
import { ConnectToDatabase } from "../../../db/connection";

export default async (req,res) => {

    const db = await ConnectToDatabase()

    const { name, description, link, reactions,negociations, myId } = req.body
    const app = {name: name, description: description, link: link, reactions: reactions, negociations: negociations, myId:myId}
    const method = req.method;
    const appstoacept = await db.collection('appstoacept')

    if(method === 'POST'){
        
        const aceptedapps = await db.collection('aceptedapps')
        const insertedIntoAceptedApps = await aceptedapps.insertOne({myId,app})
       
        const users = await db.collection('users')
        const insertedIntoUsers = await users.updateOne({'_id': ObjectId(myId)}, { $push: { apps: app } } )

      
        const appdetedafteracepted = appstoacept.deleteOne({'name': app.name})
        
        if(!(insertedIntoUsers && insertedIntoAceptedApps)){
            res.send({
                messge:'Ocorreu algum erro',
                sugestion:'verifique sua internet'
            })
            return 
        }
        res.send({message:'Inserido com sucesso!'})
    }

    }
    



