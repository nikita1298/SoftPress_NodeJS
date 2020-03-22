const mongoose=require('mongoose');
const articleSchema=mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    user_id:{type:String,require:true,ref:'User'},
    author_id:{type:String,require:true,ref:'Author'},
    art_cat_id:{type:String,required:true,ref:'Article'},
    article_title:{type:String,required:true},
    article_file:{type:String,require:true},
    article_img:{type:String,required:true},
    description:{type:String,require:true},
    a_status:{type:String,required:true,default:'1'},
    status:{type:String,required:true,default:'0'},
    created_date:{type:Date,default:Date.now()}
});

module.exports=mongoose.model('Article',articleSchema);