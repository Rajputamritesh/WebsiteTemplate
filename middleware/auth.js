const config=require('config');
const jwt =require('jsonwebtoken');


function auth(req,res,next){
    const token=req.header('x-auth-token');
    // if(req.date)
    // {
    //     date=req.date;
    // }
    //check for token
    if(!token) return res.status(401).json({msg:'No. token,authorization denied'});
    try{
        //verify token
        const decoded=jwt.verify(token,config.get('JWTSecret'));
        //Add user form payload
        req.user=decoded;
        next();


    }catch(e){
            res.status(400).json({msg:'Token is not valid'});
    }


}

module.exports=auth;
