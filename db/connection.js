import { MongoClient } from 'mongodb' 

export async function ConnectToDatabase(){
    const client = await new MongoClient.connect(process.env.MONGODB_URL, {
        useUnifiedTopology:true,
        useNewUrlParser:true,
        useFindAndModify:true
    })

    if(!client.isConnect()){
        return await client.Connect()
    }

    const db = await client.db(process.env.MONGODB_NAME)

    return {db}
}

export function jsonsify(obj){
    return JSON.stringify(JSON.parse(obj)) 
}
