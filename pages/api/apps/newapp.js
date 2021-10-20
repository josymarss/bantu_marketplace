import {ConnectToDatabase} from '../../../db/connection'



export default (req,res) => {
    const db = ConnectToDatabase()
    const appsToAcept = db.collection('appstoacept')
    const method = req.method
    const { name, description,link,
        reactions,photo,negociations, myId
    } = req.body
    if(mothod=='POST'){
        const data = appsToAcept.insertOne(
            { name, description,link,
            reactions,negociations, myId
        })
        console.table(data)
    }
    
}