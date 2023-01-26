const express = require('express')
const router = express.Router()
const {
    register,
    login,
    forgetPass,
    resetPass,
    logout,
    refreshToken

} = require('../controllers/authenticateController')

// -------------------------CUSTOM ROUTE-------------------------
router.post('/login', login)
router.post('/register', register)
// router.post('/forgetpass', forgetPass)
// router.post('/resetpass', resetPass)
router.post('/token', refreshToken)
router.post('/logout', logout)

// -------------------------EXPORT ROUTER-------------------------
module.exports = router