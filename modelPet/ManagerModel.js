// import * as Schema from "mongoose";

const mongoose=require('mongoose');
const schema =mongoose.Schema;
//create schema

const ManagerSchema=new schema({

    name:{
        type:String,
    },
    supervision:
        [{ type : schema.Types.ObjectId,
            ref: 'employeeInfo' }],


    Role:{
        type:String,
        required: true
    },
    email:{
        unique:true,
    type:String
    },
    password:{
        type:String,
        required:true
    },
    phone:{
    type:String
    },



});
module.exports=ManagerInfo=mongoose.model('ManagerInfo',ManagerSchema);
