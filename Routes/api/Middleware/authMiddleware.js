const express=require('express');
const router=express.Router();
const User=require('../../../models/User');
var bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');



exports.UserValidation=(req,res,next)=>{

    // res.send({success:true})
    const {email,password}=req.body;

    //simplevalidation
    if(!email||!password){
        return res.status(400).json({msg:'Please enter all fields'});
    }

    User.findOne({email}).then(user=>{
        console.log(user);
       
        if(!user) return res.status(400).json({msg:'User does not exsist'});

        req.user=user;
        req.EnteredPassword=password;
        next();
//Encrypting passowrd and checkong if entered password correct or not
    })
}



exports.Employees=(req,res,next)=>{
       // res.send({success:true})
      console.log(req);
        let x=req.user;
        let EnteredPassword;
        if(req.EnteredPassword)
        {
        EnteredPassword=req.EnteredPassword;
        }
        let id;
        if(req.user.id)
        {
            id=req.user.id;
        }
        if(req.user._id)
        {
            id=req.user._id
        }
        console.log(id);
    //   User.find({EmployerId:req.user._id})//what parameter to find for
        
        // .populate("EmployerId","name email")//gives the user id and name it is basically populating the user related to it
        // .exec((err,Employees)=>{//we get the order
        //     if(err){
        //         return res.status(400).json({
        //             error:err
        //         })
        //     }
        //     console.log(Employees);
        //     req.user=x;
        //     req.EnteredPassword=EnteredPassword;
        //      req.user.Employees=Employees;
        //      next();
        // }) )
        User.find({EmployerId:id}).then(Employees=>{
            console.log(Employees)
            req.user=x;
                req.EnteredPassword=EnteredPassword;
                 req.Employees=Employees;
                 next();
        }).catch(err=>console.log(err))
    
    }