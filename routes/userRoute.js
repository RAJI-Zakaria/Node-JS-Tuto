const express = require('express')
const router = express.Router()
const {
    signUp,
    updateSignUp ,
    getAllUsers,
    getSingleUser,
    deleteSingleUser,
    deleteAllUsers,

} = require('../controllers/userController')

// -------------------------CUSTOM ROUTE-------------------------
router.post('/', signUp)

router.put('/:id', updateSignUp)

router.get('/', getAllUsers)

router.get('/:id', getSingleUser)

router.delete('/:id', deleteSingleUser)

router.delete('/', deleteAllUsers)



// -------------------------EXPORT ROUTER-------------------------
module.exports = router