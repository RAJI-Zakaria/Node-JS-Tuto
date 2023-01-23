const express = require('express')
const router = express.Router()
const {
    signUp,
    updateSignUp ,
    getAllUsers,
    getSingleUser,
    deleteSingleUser,
    deleteAllUsers,
    getUserPosts,
    getUserOrders

} = require('../controllers/userController')
const {getPostUser} = require("../controllers/postController");

// -------------------------CUSTOM ROUTE-------------------------
router.post('/', signUp)

router.put('/:id', updateSignUp)

router.get('/', getAllUsers)

router.get('/:id', getSingleUser)

router.delete('/:id', deleteSingleUser)

router.delete('/', deleteAllUsers)



router.get('/:id/posts', getUserPosts)
router.get('/:id/products', getUserOrders)

// -------------------------EXPORT ROUTER-------------------------
module.exports = router