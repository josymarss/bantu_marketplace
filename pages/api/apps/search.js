import  { ConnectToDatabase } from '../../../db/connection'

export default async(req,res) => {
    const { value } = req.body
    const method = req.method
    const db = await ConnectToDatabase()
    const users = await db.colletion('users')

    if (method === 'POST') {
        const result = await users.find({ apps: {name:value} }, {apps:1} )
        if(!!result){
            //returning any array off apps
            res.send({result})
            return 
        }
        res.send({
            message:'Aplicativos não encontrados',
            sugestion:'verfica bem o nome do aplicativo que deseja encontrar'
        })
    }
}