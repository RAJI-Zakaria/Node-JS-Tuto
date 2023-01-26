const express = require('express')
const router = express.Router()
const {
    signUp,
    login,
    updateSignUp ,
    getAllUsers,
    getSingleUser,
    deleteSingleUser,
    deleteAllUsers,
    getUserPosts,
    getUserOrders

} = require('../controllers/userController')

const ROLES_LIST = require('../_helpers/roles');

const verifyRoles = require('../middleware/verifyRoles');

// -------------------------CUSTOM ROUTE-------------------------
router.post('/', signUp)

router.post('/login', login)

// router.put('/:id', updateSignUp)

router.get('/', verifyRoles(ROLES_LIST.Admin), getAllUsers)

router.get('/:id', verifyRoles(ROLES_LIST.Admin), getSingleUser)

router.delete('/:id', verifyRoles(ROLES_LIST.Admin),  deleteSingleUser)

router.delete('/',verifyRoles(ROLES_LIST.Admin), deleteAllUsers)



router.get('/:id/posts', verifyRoles(ROLES_LIST.Admin), getUserPosts)
router.get('/:id/products', verifyRoles(ROLES_LIST.Admin), getUserOrders)

// -------------------------EXPORT ROUTER-------------------------
module.exports = router