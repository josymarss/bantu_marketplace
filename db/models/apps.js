import mongoose, {Schema} from 'mongoose'

import User from '../user'

const AppSchema = new Schema({
    name:String,
    tpye:String,
    avatar:{
        data:Buffer,
        type:String,
    },
    author:String,
    linkmedia:String,
    images:[{
        data:Buffer,
        type:String,
    }],
    reactions:{
        _idUser:mongoose.Types.ObjectId,
        stars:Number,
        solicitations:Number    
    },
    negociations:[{
        user:User,
        description:String,
        status:['ongoing','acept','fail']
    }]
}) 

export default monggose.model('Apps', AppSchema)