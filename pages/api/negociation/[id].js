import { ConnectToDatabase } from '../../../db/connection'

export default async (req,res) => {

    const db = ConnectToDatabase()
    const { idWhoWantMakeNegociation, idUser, description } = req.body
    
    const appNegociation = db.collection('users').findOne({ id })
    res.json({appNegociation})
}