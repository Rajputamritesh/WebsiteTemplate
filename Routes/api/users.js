const express=require('express');
const router=express.Router();
const User=require('../../models/User');
var bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');


router.post('/',(req,res)=>{
 // res.send({success:true})
 const {name,email,password}=req.body;

 //simplevalidation
 if(!name||!email||!password){
  return res.status(400).json({msg:'Please enter all fields'});

 }
//check for exsisting user
 User.findOne({email})
     .then(user=>{
  if(user) return res.status(400).json({msg:'User already exsists'});

  const newUser= new User({
   name,
   email,
   password
  });
  //Create salt &hash
  bcrypt.genSalt(10,(err,salt)=>{
  bcrypt.hash(newUser.password,salt,(err,hash)=>{
   if(err) throw err;
   newUser.password=hash;
   newUser.save().then(user=>{

    jwt.sign(
        {id:user.id},
        config.get('JWTSecret'),
        {expiresIn:3600},//onehour
        (err,token)=>{
         if(err) throw err;
         res.json({
         token,
          user:{
           id:user.id,
           name:user.name,
           email:user.email,

          }
         })


        }




     )





   }).catch(err=>{console.log(err)});

  })


  })


 }).catch(err=>{console.log(err)});
});


module.exports=router;
