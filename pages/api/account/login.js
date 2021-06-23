import { ConnectToDatabase } from '../../../db/connection'

export default async (req, res) => {
    const db = await ConnectToDatabase()
    const httpMethod = req.method
    const { phone, password } = req.body
    if (httpMethod === 'POST'){
        const users = await db.collection('users')
        const result = await users.find({phone:phone},{_id:1})//not working
        console.log(result)
        result ? res.status(200).send({token:result._id}) : 'User not found!'
    }
}