// import * as Schema from "mongoose";

const mongoose=require('mongoose');
const schema =mongoose.Schema;
//create schema

const employeeStruct=new schema({

    name:{
        type:String,
        required:true
    },
    Role:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true
    },
    supervision: [{ type : schema.Types.ObjectId,
            ref: 'clientStruct' }],//many clients to one employee



    phone:{
        type:String,
        required:true
    },



});
module.exports=employeeInfo=mongoose.model('employeeInfo',employeeStruct);
