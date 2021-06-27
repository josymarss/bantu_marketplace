import  { ConnectToDatabase } from '../../../db/connection'

export default async (req,res) => {
    
    const db = await ConnectToDatabase()
    const users = await db.collection('users')
    const httpMethod = req.method
    const { name,photo,phone,province,description,apps,followers, password,feed } = req.body
    
    if(httpMethod === 'POST'){
        const alredyExist = await users.findOne({ phone }, {_id:1})
       
        if(alredyExist){
            res.send({
                message:'This number is alredy registered', 
                sugestion: 'Try to login'
            })
            return
        }

        const result = await users.insertOne({
             name,photo,phone,province,
             description,apps,followers, 
             password,feed 
        })
       
        const { _id } = result.ops[0]
        
        res.send({tokenId:_id})
    }
}