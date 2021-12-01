import { ConnectToDatabase } from '../../.././db/connection'

export default async (req, res) => {
    const db = await ConnectToDatabase()
    const httpMethod = req.method
    const { phone, password } = req.body

    if (httpMethod === 'POST'){
        const users = await db.collection('users')
        const user = await users.findOne({phone, password}, { _id:1 })
        if(!user){
            res.send({
                message:'Usário não encontrado!',
                sugestion:'Tenta criar uma conta'
            })  
            return 
        } 
        const { _id } = user;
        res.send({
            tokenId:_id,
            message:'Agora estás logado.'
        });
    }
}