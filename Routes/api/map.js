const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');

// var app=express();
const apiService=require('./service');
const fetch = require('node-fetch');
const https = require('https');
const mapSkeleton=require('../../models/mapSkeleton');
// const request=require('request');
router.post('/',auth,(req,res)=>{
    // let keyword=req.body();
    console.log(req.body);
    let obj={
        latitude:req.body.coords.lat,
        longitude:req.body.coords.lng,
        name:req.body.userMessage.name,
        message:req.body.userMessage.message,
        id:req.body.authId
    }
        console.log(obj.message+"<----");
    apiService.postMessageMap(obj,(err,response) =>{
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

router.get('/',auth,(req,res)=>{
       let arr = [];
    let quDate=req.query.date;
    let id=req.query.id;
    console.log(id);
    quDate=new Date(quDate);
    // console.log(qud)
    // console.log("map------->"+queryDate);
    console.log(quDate);
    console.log(quDate.getFullYear());
       mapSkeleton.find({},function (err,obj) {

           //another unique way to take out all parameters from mongodb
        if (err) {
            res.send('something went wrong');
        }
        else
        {
            obj.forEach(data => {
                    let x = data.date;
                    console.log(data);
                    if (id==data.addedBy && 
                        x.getDate() === quDate.getDate() && 
                        x.getMonth() === quDate.getMonth() &&
                         x.getFullYear() === quDate.getFullYear()) {
                        arr.push(data);
                        
                    }
                    console.log(x.getDate() + " " + x.getMonth() + " " + x.getFullYear());
                    console.log(quDate.getDate() + " " + quDate.getMonth() )
                
                }
                )
                    console.log(arr)
                res.json(arr);}
            }  )


});

module.exports=router;
