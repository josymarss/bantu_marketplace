import mongoose, {Schema} from 'mongoose'

const AppSchema = new Schema(
{
    idUser:{type:mongoose.Types.ObjectId},
    name: {type:String},
    avatar:{type:String},
    linkmedia:{type:String},
    image:{type:String},
    reactions:{type:Number},
    negociations:[{
        name:{type:String},
        avatar:{type:String},
        description:{type:String},
    }]
}) 
export default monggose.model('App', AppSchema);