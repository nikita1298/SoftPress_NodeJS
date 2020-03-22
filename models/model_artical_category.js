const mongoose=require('mongoose');

const articlecatSchema=mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    article_type:{type:String,required:true},
     status:{type:String,default:'0'},
    created_date:{type:Date,default:Date.now()}
});
module.exports=mongoose.model('Article_cat',articlecatSchema);