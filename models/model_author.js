const mongoose=require('mongoose');


const authorSchema=mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name:{type:String,require:true},
    status:{type:String,required:true,default:'0'},
      
    created_date:{type:Date,default:Date.now()}
});
module.exports=mongoose.model('Author',authorSchema);