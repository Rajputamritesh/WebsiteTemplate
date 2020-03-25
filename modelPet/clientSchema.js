// import * as Schema from "mongoose";

const mongoose=require('mongoose');
const schema =mongoose.Schema;
//create schema

const ClientSchema=new schema({

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
    phone:{
        type:String,
        required:true

    },
    dogName:{
        type:name,
        required:true

    },
    dogType:{
        type:String,
        required:true

    },
    dogBreed:{
        type:String,
        required:true

    }




});
module.exports=clientStruct=mongoose.model('clientStruct',ClientSchema);
