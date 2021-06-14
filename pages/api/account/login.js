import { db } from '../../../db/connection'

export default (req, res) => {
    const { name, password } = req.query
    const users = db.collections('users').findOne({name, password})
    const {password, ...user } = users 
    res.send(user)
}