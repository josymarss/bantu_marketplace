import { db } from '../../../db/connection'

export default (req,res) => {
    const { _id, password } = req.body
    const users = db.collection('users')
    const result = users.updateOne({_id},{password})
    res.send({tokenId:result._id}).json()
}