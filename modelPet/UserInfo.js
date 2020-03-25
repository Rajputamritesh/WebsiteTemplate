// import * as Schema from "mongoose";

const mongoose=require('mongoose');
const schema =mongoose.Schema;
//create schema
const UserInfoSchema=new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        unique:true,
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }

});
module.exports=UserInfo=mongoose.model('UserInfo',UserInfoSchema);
