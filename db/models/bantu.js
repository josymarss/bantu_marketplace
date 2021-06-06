import mongoose, {Schema} from 'mongoose'


const bantuSchema = new Schema({
    users:[User],
    appstoAcept:[{
        id_person:mongoose.Schema.Types.ObjectId,
        app:App
    }],
    appsAcepetd:[{
        id_person:mongoose.Schema.Types.ObjectId,
        app:App
    }]
})

export default mongoose.model('bantu', bantuSchema)