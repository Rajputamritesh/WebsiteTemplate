const express=require('express');
const router=express.Router();
const User=require('../../../models/User');
var bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');


exports.validation = (req, res,next) => {
    const {name,email,password,EmployerEmail}=req.body;
  
     console.log(req.body);  
     //simplevalidation
     if(!name||!email||!password){
      return res.status(400).json({msg:'Please enter all fields'});
   
     } if(email)
     {
  
      User.findOne({email})
           .then(user=>{
        if(user) return res.status(400).json({msg:'User already exsists'}) }).catch(err=>{console.log(err)});
     }  
    
       req.user=req.body;
       next();
      
  }
  
  exports.checkForEmployer = (req, res,next) => {
      console.log(req.user);
   
    if(req.user.EmployerEmail)
    {
      let email=req.user.EmployerEmail;
      User.findOne({email}).then(user=>{
              console.log(user);
              console.log("jsjsjsjjsjjsjjs")
            return user
  }).then(EmployerDetails=>{
    const {name,email,password,EmployerEmail}=req.user;
   let  EmployerId=EmployerDetails._id;
  
    console.log(EmployerId+" "+name+" "+email+" " +password);
        const newUser= new User({
          name,
          email,
          password,
          EmployerId
         });
    
         req.newUser=newUser;
        req.newUser.EmployerDetails=EmployerDetails;
         console.log(req.newUser)
          next();
  }).catch(err=>res.status(400).json({msg:'Something went wrong'}))
  }
  else{
    const {name,email,password}=req.user;
  
    console.log(name+" "+email+" " +password);
        const newUser= new User({
          name,
          email,
          password       
         })
          
         req.newUser=newUser;
         console.log(req.newUser)
         next();
        }
      

      
    }

  exports.signJwt=(req,res)=>{
    const {newUser}=req;
       bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(newUser.password,salt,(err,hash)=>{
    
       if(err) throw err;
       newUser.password=hash;
       console.log("-----------------");


       newUser.save().then(user=>{
         let  EmployerId="";
         if(user.EmployerId)
         {
           EmployerId=user.EmployerId;
         }
         console.log(user);
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
                EmployerId:EmployerId
    
              }
             })
            }  
   
         ) 
         }).catch(err=>{console.log(err)});
    
      })  
      })
  
  
  }