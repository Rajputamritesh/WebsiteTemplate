const express=require('express');
const router=express.Router();
// const Chat=require('../../models/chat');

const UserInfo=require('../../modelPet/UserInfo');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const config=require('config');

router.get('/',(req,res)=>{

   res.json({"message":"server working"});

});

router.post('/',(req,res)=>{
      const {name,email,password}=req.body;
   //simplevalidation
   if(!name||!email||!password){
      return res.status(400).json({msg:'Please enter all fields'});

   }
   UserInfo.findOne({email})
       .then(user=> {
          if (user) return res.status(400).json({msg: 'User already exsists'});
       });
      const role="Manager";

   const newUser= new UserInfo({
      name,
      email,
      password,
      role
   });
   //res.json({"name":name});

   //hashing password and imply jwt
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
                         role:user.role

                      }
                   })


                }




            )





         }).catch(err=>(console.log(err)));

      })


   })

});
module.exports=router;
