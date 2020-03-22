const mongoose=require('mongoose');

const bookcatSchema=mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name:{type:String,require:true},
    status:{type:String,required:true,default:0},
      
    created_date:{type:Date,default:Date.now()}
});
module.exports=mongoose.model('Book_cat',bookcatSchema);