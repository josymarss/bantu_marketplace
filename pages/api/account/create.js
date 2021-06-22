import db from '../../../db/connection'

export default (req,res) => {

    const users = db.collection('users')
    const httpMethod = req.method
    const { phone, ...rest } = req.body

    if(httpMethod === 'POST'){
        const someoneHas = users.find({phone})
        if(someoneHas !== ''){
            res.send({
                error:'erro',
                message:`Este número ${ phone } já está em uso`,
                sugestion:'Clica em recuperar a conta!'
            }).json()
        }else{
            const result = users.insertOne({...rest,phone})
            res.status(200).send({token:result._id}) 
        } 
        
    }else{
        res.send('Only post request.')
    }
    
}