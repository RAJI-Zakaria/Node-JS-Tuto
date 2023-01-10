
const express = require('express');
//must use the router function
const router = express.Router();





router.get('/', (req,res)=>{
    res.render('index', {title:"Zak's Howdy", message:"Hello"});
})



module.exports=router;