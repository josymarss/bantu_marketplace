import mongoose,{Schema} from 'mongoose';

const FollowerSchema = mongoose.Schema({
      _id:mongoose.Types.ObjectId,
      follower:[]
});

export default mongoose.model('Follower',FollowerSchema);