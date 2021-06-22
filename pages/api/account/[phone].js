import { db } from '../../../db/connection'
import SendMessage from '../../message'
import { useRouter } from 'next/router'

export default (req, res) => {
    const router = useRouter()
    const { phone } = req.query
    const users = db.collection('users')
    const result = users.findOne({phone})
    if(SendMessage(result.name, phone)){
        router.push(`/changepassword/${result._id}`)
    }
}