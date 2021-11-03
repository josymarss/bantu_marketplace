import { MongoClient } from 'mongodb' 

let cacheDb = null ;

export async function ConnectToDatabase(){

    if(cacheDb){
        return cacheDb
    }
    
    const client = await MongoClient.connect('mongodb://localhost:27017', {
        useUnifiedTopology:true,
        useNewUrlParser:true,
        // useFindAndModify:true
    });

    const db = await client.db('bantu');

    cacheDb = db;
    
    return db ;
}

