const mongoose=require('mongoose');
const schema =mongoose.Schema;
//create schema
const {ObjectId}=mongoose.Schema;
const UserSchema=new schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true,
        unique:true
     },
     EmployerId:{
        type:ObjectId,
        ref:"User",
    
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now

    }


});
module.exports=User=mongoose.model('User',UserSchema);
