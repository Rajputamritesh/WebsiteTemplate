const express=require('express');
const router=express.Router();
const User=require('../../models/User');
var bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');
const auth=require('../../middleware/auth')
//@route POST api/auth

const {UserValidation,Employees}=require("../api/Middleware/authMiddleware");

router.post('/',UserValidation,Employees,(req,res)=>{

    // // res.send({success:true})
    // const {email,password}=req.body;

    // //simplevalidation
    // if(!email||!password){
    //     return res.status(400).json({msg:'Please enter all fields'});
    // }
    // // Order.find({user:req.profile._id}//what parameter to find for
        
    // //     .populate("user","_id name")//gives the user id and name it is basically populating the user related to it
    // //     .exec((err,order)=>{//we get the order
    // //         if(err){
    // //             return res.status(400).json({
    // //                 error:err
    // //             })
    // //         }
    // //         return res.json({order});

    // //     })
    // //     )
    // User.findOne({email}).then(user=>{
    //     console.log(user);
       
        // if(!user) return res.status(400).json({msg:'User does not exsist'});
//Encrypting passowrd and checkong if entered password correct or not

const {EnteredPassword,user,Employees}=req;
console.log(user);
console.log(Employees);
console.log(EnteredPassword);
let EmployeesArray=req.Employees;
            
        bcrypt.compare(EnteredPassword,user.password).then(isMatch=>{
            if(!isMatch) return res.status(400).json({msg:'Invalid Credentials'});

            jwt.sign(
                {id:user._id},
                config.get('JWTSecret'),
                {expiresIn:3600},//onehour
                (err,token)=>{
                    if(err) throw err;
                    res.json({
                        token,
                        user:{
                            id:user._id,
                            name:user.name,
                            email:user.email,
                            EmployerId:user.EmployerId,
                            Employees:EmployeesArray

                        }
                    })


                }

            )
        })
    // })
});

//to get the information just by jwt tpken of specific user
// the decoded value was set in rrq.user in middleware/auth so from there we get the id
router.get('/user',auth,Employees,(req,res)=>{
    User.findById(req.user.id)
        .select('-password')
        .then(user=>{
            let EmployeesArray=req.Employees;
            console.log(Employees);
            console.log("-----------------------");
            console.log(user);
            res.json({
               
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    EmployerId:user.EmployerId,
                    Employees:EmployeesArray

                }
            
        )});

})


module.exports=router;
