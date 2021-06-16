import { db } from '../../../db/connection'

export default (req,res) => {
    //const { description } = req.body
    const { method } = req.body
    if(method === 'POST'){
        res.json({token:'ajfuwgr16523vbjsdbjfk82bhjg'})
    }
    
}