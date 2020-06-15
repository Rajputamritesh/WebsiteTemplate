const mongoose=require('mongoose');
const schema =mongoose.Schema;
//create schema
const {ObjectId}=mongoose.Schema;

const ItemSchema=new schema({
name:{
    type:String,
    required:true

},
    date:{
        type:Date,
        default: Date.now

    },
    addedBy:{
        type:ObjectId,
        ref:"User",
        required:true
    }


});
module.exports=Item=mongoose.model('item',ItemSchema);
