import mongoose from 'mongoose'

export async function ConnectToDB(){
    return mongoose.connect(process.env.DB, {
        useUnifiedTopology:true,
        useNewUrlParser:true,
        useFindAndModify:true
    })
}

export function jsonsify(obj){
    return JSON.stringify(JSON.parse(obj))
}