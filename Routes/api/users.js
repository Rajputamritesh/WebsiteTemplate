const express=require('express');
const router=express.Router();
const User=require('../../models/User');
var bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');

const {validation,checkForEmployer,signJwt}=require("../api/Middleware/userMiddleware");


router.post("/",validation,checkForEmployer,signJwt);




// router.post('/',(req,res)=>{
 // res.send({success:true})
//  const {name,email,password,EmployerEmail}=req.body;

//  console.log(req.body);

//  //simplevalidation
//  if(!name||!email||!password){
//   return res.status(400).json({msg:'Please enter all fields'});

//  }
// //check for exsisting user
// let EmployerId;let newUser;
//  User.findOne({email})
//      .then(user=>{
//   if(user) return res.status(400).json({msg:'User already exsists'}) }).catch(err=>{console.log(err)});
//   let originalEmail=email;

//   if(EmployerEmail!=='')
//   {
//    console.log("here");
//     let email=EmployerEmail;
//     console.log(email);
//     User.findOne({email}).then(user=>{
//       console.log(user);
//       console.log("jsjsjsjjsjjsjjs")
//       email=originalEmail;
//       return user._id;     

//   }).then(EmployerId=>{
//     console.log(EmployerId+" "+name+" "+email+" " +password);
//     const newUser= new User({
//       name,
//       email,
//       password,
//       EmployerId
//      });

//      return newUser;
//   }).then(x=>{
//     console.log(x);
//       //Create salt &hash
   
    
//   newUser=x;  
//   }).catch(err=>console.log(err))
//   }else{
//     const x= new User({
//       name,
//       email,
//       password,
//      });
//      console.log(x);
//     newUser=x;
 
    
//   }
//     console.log("-------")
  
//     console.log(newUser);
//     bcrypt.genSalt(10,(err,salt)=>{
//       bcrypt.hash(newUser.password,salt,(err,hash)=>{
//        if(err) throw err;
//        newUser.password=hash;
//        newUser.save().then(user=>{
//           console.log(user);
//         jwt.sign(
//             {id:user.id},
//             config.get('JWTSecret'),
//             {expiresIn:3600},//onehour
//             (err,token)=>{
//              if(err) throw err;
//               res.json({
//              token,
//               user:{
//                id:user.id,
//                name:user.name,
//                email:user.email,
//                EmployerEmail:user.EmployerEmail
    
//               }
//              })
    
    
//             }
    
    
    
    
//          )
    
    
    
    
    
//        }).catch(err=>{console.log(err)});
    
//       })
    
    
//       })
  
  

// });



module.exports=router;
