
const express = require('express');
//must use the router function
const router = express.Router();


const user = require('../routes/userRoute')
const post = require('../routes/postRoute')
const comment = require('../routes/commentRoute')
const product = require('../routes/productRoute')



const logger = require('../middleware/logger')




router.get('/', logger, (req,res)=>{
    res.render('index', "welcome to our api");
})

// Routing
router.use('/users', user)
// Routing
router.use('/posts', post)

router.use('/comments', comment)
router.use('/products', product)

module.exports=router;