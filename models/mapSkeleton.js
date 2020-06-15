const mongoose=require('mongoose');
const schema =mongoose.Schema;
//create schema
const {ObjectId}=mongoose.Schema;

var Float = require('mongoose-float').loadType(mongoose);
const MapSchema=new schema({
    name:{
        type:String,
        required:true

    },
    message:{
        type:String,
        required:true,

    },
    longitude:{
        type:String,
        required:true
    },
    latitude:{
        type:String,
        required:true

    },
    addedBy:{
        type:ObjectId,
        ref:"User",
        required:true
    },
    date:{
        type:Date,
        default: Date.now

    }

});

module.exports=mapSkeleton=mongoose.model('mapSkeleton',MapSchema);
