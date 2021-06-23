import { ConnectToDatabase } from '../../../db/connection'
import Cookies from 'js-cookie'
export default async (req, res) => {

    const db = await ConnectToDatabase()
    const httpMethod = req.method
    const { phone, password } = req.body

    if (httpMethod === 'POST'){
        const users = await db.collection('users')
        const result = await users.findOne({}, { phone, password }) 

        if(result === undefined){
            res.status(200).json({
                message:'Usário não encontrado!',
                sugestion:'Tenta criar uma conta'
            })  
            return 
        }

        const { _id } = result        

        Cookies.set('tokenId',_id, { expires: 365 })
        res.status(200).send({
            tokenId:_id,
            message:'Agora estás logado.'
        })
    }
}