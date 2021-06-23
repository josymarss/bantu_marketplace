import  { ConnectToDatabase } from '../../../db/connection'

export default async (req,res) => {
    
    const db = await ConnectToDatabase()
    const users = await db.collection('users')
    const httpMethod = req.method
    const { ...user } = req.body
    const { phone } = req.body

    if(httpMethod === 'POST'){
        if(phone === await users.findOne({phone})){
            res.send('This number is alredy registered, try to login')
            return
        }

        const result = await users.insertOne({user})

        const { insertedId } = result
        
        res.status(200).send({tokenId:insertedId})
    }
}