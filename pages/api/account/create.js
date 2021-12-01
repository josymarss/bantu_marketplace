import  { ConnectToDatabase } from '../../../db/connection';
import handler from '../../../middleware';

export default handler.post(async (req,res) => {
    const db = await ConnectToDatabase();
    const users = await db.collection('users');
    const httpMethod = req.method;

    const { fullName,name,photo,phone,province,description,password,feed,followers } = req.body;
    
    if(httpMethod === 'POST'){
        const alredyExist = await users.findOne({ phone }, {_id:1});
        if(!!alredyExist){
            res.send({
                message:'Este número já está cadastrado', 
                sugestion: 'Faça login'
            });
            return;
        }
        const result = await users.insertOne({
            fullName,
            name,
            phone,
            province,
            description, 
            password,
            avatar:photo,
            feed,
            followers
        });
        const { _id } = result.ops[0];
        res.send({tokenId:_id});       
    }    
});



 
    
    
