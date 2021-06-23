import ConnectToDatabase from '../../../db/connection'
import SendMessage from '../../message'
import { useRouter } from 'next/router'

export default async (req, res) => {
    const db = await ConnectToDatabase()
    const router = useRouter()
    const { phone } = req.query
    const users = await db.collection('users')
    const result = await users.findOne({phone})
    if(SendMessage(result.name, phone)){
        router.push(`/changepassword/${result._id}`)
    }
}