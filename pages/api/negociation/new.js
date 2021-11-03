import { ConnectToDatabase } from '../../../db/connection'

export default (req,res) => {
    const db = ConnectToDatabase();
    const  { idUser,idUserOfTheApp,nameApp,negociation }  = req.body;
    const  method  = req.method;

    if(method === 'POST'){
        const users = await db.collection('users');
        const result = await users.updateOne(
            { _id:idUserOfTheApp, name:nameApp }, 
            {$set:{apps:{ $push:{idUser,nameApp,negociation} } } }
        );
        console.log(result);
    }
    
}