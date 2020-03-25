const express=require('express');
const router=express.Router();
const User=require('../../models/User');
var bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');
const auth=require('../../middleware/auth')
//@route POST api/auth
router.post('/',(req,res)=>{

    // res.send({success:true})
    const {email,password}=req.body;

    //simplevalidation
    if(!email||!password){
        return res.status(400).json({msg:'Please enter all fields'});

    }


    User.findOne({email}).then(user=>{
        if(!user) return res.status(400).json({msg:'User does not exsist'});
//Encrypting passowrd and checkong if entered password correct or not
        bcrypt.compare(password,user.password).then(isMatch=>{
            if(!isMatch) return res.status(400).json({msg:'Invalid Credentials'});

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



        })


    })
});

//to get the information just by jwt tpken of specific user
// the decoded value was set in rrq.user in middleware/auth so from there we get the id


router.get('/user',auth,(req,res)=>{

    User.findById(req.user.id)
        .select('-password')
        .then(user=>res.json(user));

})


module.exports=router;
