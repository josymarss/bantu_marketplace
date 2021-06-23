import { MongoClient } from 'mongodb' 

let cacheDb = null 

export async function ConnectToDatabase(){

    if(cacheDb){
        return cacheDb
    }
    
    const client = await MongoClient.connect(process.env.MONGODB_URL, {
        useUnifiedTopology:true,
        useNewUrlParser:true,
        // useFindAndModify:true
    })

    const db = await client.db(process.env.DB_NAME)

    cacheDb = db
    
    return db 
}

