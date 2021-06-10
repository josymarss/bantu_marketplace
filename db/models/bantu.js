import mongoose, {Schema} from 'mongoose'


const adminSchema = new Schema({
    appstoAcept:[{
        _id:mongoose.Schema.Types.ObjectId,
        app:App
    }],
    appsAcepetd:[{
        id_person:mongoose.Schema.Types.ObjectId,
        app:App
    }]
})

export default mongoose.model('adminData', bantuSchema)