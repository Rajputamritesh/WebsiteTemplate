const express=require('express');
const router=express.Router();
const Chat=require('../../models/chat');
const auth=require('../../middleware/auth');



router.get('/',(req,res)=>{

    Chat.find()
        .populate("sender")
        .then(chats=>res.json(chats));
});
module.exports=router;
