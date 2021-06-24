import { ConnectToDatabase } from "../../../db/connection";

export default async(req,res) =>{
    
    const db = await ConnectToDatabase()
    const { myId, ...apps } = req.body

    const appstoacept = await db.collection('appstoacept')
    const result = appstoacept.insertOne({myId,app})
    
    console.table(result)

}