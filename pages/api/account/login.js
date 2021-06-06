import { db } from '../../../db/connection'

export default (req, res) => {
    const { name, password } = req.query
    db.collections('users').findOne({})
    res.send(user)
}