
const express = require('express');
//must use the router function
const router = express.Router();
const io = require('../singleton/socket')
const connectionMap = require("../singleton/connectionMap");





router.get('/', (req,res)=>{

    let { socketId} = req.body

    io.to(socketId).emit('CH02', "hiiii");

    res.render('index', {title:"Zak's Howdy", message:"Hello"});
})



module.exports=router;