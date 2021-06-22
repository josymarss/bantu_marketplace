import { db } from '../../../db/connection'

export default (req, res) => {
    const httpMethod = req.method
    const { phone, password } = req.body
    if (httpMethod === 'POST'){
        const users = db.collection('users')
        const result = users.findOne({phone},{password})
        result ? res.status(200).json({token:result._id}) : 'User not found!'
    }
    else{
        res.send({message:'Not found user'}).json()
    }
}