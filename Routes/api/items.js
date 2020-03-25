const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const forEach = require("mongoose");
//item Model
//req is an object containing information about the HTTP request that raised the event.
// In response to req, you use res to send back the desired HTTP response.
//date:-1 means in descending order
Item=require('../../models/items');
//'/' means we are using router.get/post/delete so it comes under api/items file  if the below
//route were defined in serverjs then we woulds have used /api.....
router.get('/',auth,(req,res)=>{
console.log(req.query.date);
    Item.find().sort({date:-1}).then(items=>{
//console.log(items);

        let queryDate=new Date(req.query.date);
        console.log("items--->"+queryDate)
    let arr=[];
  items.forEach(data=>{
      let x=new Date(data.date);
      if(x.getDate()===queryDate.getDate()&&x.getMonth()===queryDate.getMonth()&&x.getFullYear()===queryDate.getFullYear())
      {
      arr.push(data);

      }

  })


console.log(arr);
  if(arr) {
      res.json(arr)
  }else{
      res.send("No Info added");
  }
} )
});



//we send res by res.json();we take req by req.body --->bodyparser
//date param is set in schema is set automatically
router.post('/',auth,(req,res)=>{
    const newItem= new Item({
        name:req.body.name
    });
    newItem.save().then(item=>res.json(item))
});
//nwo delete
router.delete('/:id',auth,(req,res)=>{
   Item.findById(req.params.id)
       .then(item=>item.remove().then(()=>res.json({success:true})))
           .catch(err=>res.status(404).json({success:false}))
});



module.exports=router;
