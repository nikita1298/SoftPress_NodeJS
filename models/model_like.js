const mongoose=require('mongoose');


const likeSchema=mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    user_id:{type:String,require:true,ref:'User'},
    book_id:{type:String,require:true,ref:'Book'},
    // rm_date:{type:Date,default:Date.now()},
    status:{type:String,required:true,default:0},
    model_t:{type:String,required:true},
    created_date:{type:Date,default:Date.now()}
});
module.exports=mongoose.model('Like',likeSchema);