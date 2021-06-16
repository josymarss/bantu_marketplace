// // import mongoose,{Schema} from 'mongoose'

// // import App from '../apps'

// const Usuario = new Schema(
// {
//     name:String,
//     foto:{
//         data:Buffer,
//         type:String,
//     },
//     telefone:String,
//     province:String,
//     description:String,
//     apps:[App],
//     seguidores:[{
//         avatar:{
//             data:Buffer,
//             type:String
//         },
//         idUser:mongoose.Types.ObjectId
//     }],
//     password:String
// })

// export default mongoose.model('User', userSchema);