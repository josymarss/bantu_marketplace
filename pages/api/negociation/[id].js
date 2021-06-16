// import { db } from '../../../db/connection'

export default(req,res) => {
    const { id } = req.body
    const appNegociation = db.collection('users').findOne({ id })
    res.json({appNegociation})
}