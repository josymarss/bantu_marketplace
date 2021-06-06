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
        _iduser:String,
        name:String,
        avatar:{
            data:Buffer,
            type:String
        },
        description:String,
        status:['ongoing','acept','fail']
    }]
}) 

export default monggose.model('Apps', AppSchema)