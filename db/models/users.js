import mongoose,{Schema} from 'mongoose'

import App from '../apps'

const userSchema = new Schema({
    name:String,
    photo:{
        data:Buffer,
        type:String,
    },
    phone:Number,
    province:String,
    description:String,
    apps:[App],
    followers:[userSchema],
})

export default mongoose.model('User', userSchema);