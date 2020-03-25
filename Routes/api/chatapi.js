const express=require('express');
const router=express.Router();
const Chat=require('../../models/chat');



router.get('/',(req,res)=>{

    Chat.find()
        .populate("sender")
        .then(chats=>res.json(chats));
});
module.exports=router;
