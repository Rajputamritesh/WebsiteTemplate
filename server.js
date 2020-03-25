const express=require('express');
const mongoose=require('mongoose');
const bodyparse=require('body-parser');//gets post/get data from the body
const app=require('express')();
const secondServer=require('express')();
//create new express app
const config=require('config');
const Chat=require('../backend/models/chat');


//Bodyparser Middleware
app.use(bodyparse.json());
secondServer.use(bodyparse.json());

const UsersReg=require('./Routes/api2/userReg');
const items=require('./Routes/api/items');
const users=require('./Routes/api/users');
const auth=require('./Routes/api/auth');
const chats=require('./Routes/api/chatapi');
const search=require('./Routes/api/search');
const map=require('./Routes/api/map');
const db=config.get('mongoURI');
const path =require('path');

mongoose.connect(db, {useCreateIndex: true,useUnifiedTopology: true, useNewUrlParser: true ,useCreateIndex:true}).then(()=>console.log("connected")).catch(err=>console.log(err));
//anything that refers to /api/items should refer to items variable
app.use('/api/items',items);//anything happens in /api/items it should refer to items variable
app.use('/api/users',users);
app.use('/api/auth',auth);
app.use('/api/chats',chats);
app.use('/api/searchSuggestions',search);
app.use('/api/map',map);

//////////////////////////////////////////////////////////////////////////////
secondServer.use('/petHotel/userReg',UsersReg);
//socket.io code
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){
    console.log("socket io connected")
    // socket.emit('request', /* */); // emit an event to the socket
    // io.emit('broadcast', /* */); // emit an event to all connected sockets
    socket.on('Input Chat Message',(obj,res)=>{
                var{userDetails,nowTime,type,chatMessage}=obj;
        /* */
        try{
        const newMessageDetails= new Chat({
            message:chatMessage,
            sender:userDetails,
            type:type

        });
        console.log(newMessageDetails);
        newMessageDetails.save().then((doc,err)=>{
            console.log(doc);
            // console.log(doc);
            if(err) return({success:"failed",err});
            Chat.find({"_id":doc._id})
                .populate("sender").exec((err,doc)=>{
console.log("----->"+doc)
//v.imp use populate to get all details by storing object id and getting all details regarding that particular _id
                   return io.emit("Output Chat Message",doc);

                });
        })}
        catch (e) {
            console.log(e);
        }

    });
});

const PORT=process.env.PORT||8080;
// const PORT2=process.env.PORT||6000;

//serve static assets if in production

if(process.env.NODE_ENV=== 'production')
{
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))//its the path we will have it in postbuild script

    })
}
server.listen(PORT,()=>console.log("server started"));
// secondServer.listen(PORT2,()=>console.log("server two started"));

