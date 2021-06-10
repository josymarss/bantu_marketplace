import db from '../../../db/connection'

export default (req,res) => {
    if(req.method == 'POST'){
        res.send(req.query)
        console.log(req.query)
        //Save into the database 
    }    
}