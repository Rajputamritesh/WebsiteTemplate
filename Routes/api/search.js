const express=require('express');
const router=express.Router();
// var app=express();
const apiService=require('./service');
const fetch = require('node-fetch');
const https = require('https');
// const request=require('request');
router.post('/',(req,res)=>{
            // let keyword=req.body();
console.log(req.body.key);

            apiService.getCountryNames(req.body.key,(err,response) =>{
        console.log("resp"+response);
        if(err)
            res.send(err);
        else if(response)
            res.send(response);
    });
    // fetch(finalEndpoint)
    //     .then(data => res.json(data))
    //     .then(data => {
    //         console.log(data)
    //     })
    //     .catch(err =>console.log(err));

});
module.exports=router;
