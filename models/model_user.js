const mongoose=require('mongoose');


const userSchema=mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name:{type:String,require:true},
    mobile:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    referance:{
        email:{ type:String},
        description:{type:String}
              },
              user_type:{type:String,required:true,default:0},
              status:{type:String,required:true,default:0},
      
    created_date:{type:Date,default:function(){return new Date().getTime()}}
});
module.exports=mongoose.model('User',userSchema);