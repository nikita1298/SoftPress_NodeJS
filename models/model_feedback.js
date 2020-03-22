const mongoose=require('mongoose');

const feedbackSchema=mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    user_id:{type:String,require:true,ref:'User'},
    comment:{type:String,require:true},
    created_date:{type:Date,default:Date.now()}
});
module.exports=mongoose.model('Feedback',feedbackSchema);