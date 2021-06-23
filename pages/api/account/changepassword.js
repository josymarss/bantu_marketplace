import ConnectToDatabase from '../../../db/connection'

export default async (req,res) => {
    const db = await ConnectToDatabase()
    const { _id, password } = req.body
    const users = await db.collection('users')
    const result = await users.updateOne({'_id':_id},{$set:{'password':password}})
    res.send({ tokenId: result._id }).json()
}