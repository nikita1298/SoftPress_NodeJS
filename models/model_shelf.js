const mongoose=require('mongoose');


const shelfSchema=mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    user_id:{type:String,require:true,ref:'User'},
    book_id:{type:mongoose.Types.ObjectId,require:true,ref:'Book'},
    art_id:{type:mongoose.Types.ObjectId,require:true,ref:'Article'},

    // rm_date:{type:Date,default:Date.now()},
    status:{type:String,required:true,default:0},
    model_t:{type:String,required:true},
    created_date:{type:Date,default:Date.now()}
});
module.exports=mongoose.model('Shelf',shelfSchema);