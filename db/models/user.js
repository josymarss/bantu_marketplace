import mongoose,{Schema} from 'mongoose'

const userSchema = new Schema({
    name:{type:String},
    foto:{type:String},
    telefone:{type:String},
    province:{type:String},
    description:{type:String},
    password:{type:String},
});

export default mongoose.model('User', userSchema);