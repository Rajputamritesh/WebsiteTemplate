// import * as Schema from "mongoose";

const mongoose=require('mongoose');
const schema =mongoose.Schema;
//create schema

const ChatSchema=new schema({
  message:{
      type:String,
  },

    sender:{
      type:schema.Types.ObjectId,
        ref:'User'
    },
    type:{
      type:String
    },



});
module.exports=Chat=mongoose.model('Chat',ChatSchema);
