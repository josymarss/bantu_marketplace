import {ConnectToDatabase} from '../../../db/connection'

export default (req,res) => {
    const db = ConnectToDatabase();

    const { name, description,link,reactions,photo,negociations, myId } = req.body;
    
    const user = db.collection('users');
    user.updateOne(
        {_id:myId}, 
        {$set: {  $push : { apps: {name,description,link,reactions,negociations }}}}
    );
    console.table(user);
    res.send(user);
          
}