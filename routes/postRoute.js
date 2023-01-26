const express = require('express')
const router = express.Router()
const {
    createPost,
    updatePost,
    getAllPosts,
        getSinglePost,
    deleteSinglePost,
        deleteAllPosts,
    getPostUser

} = require('../controllers/postController')


const ROLES_LIST = require('../_helpers/roles');

const verifyRoles = require('../middleware/verifyRoles');

// -------------------------CUSTOM ROUTE-------------------------
router.post('/', verifyRoles(ROLES_LIST.Guest), createPost)

router.put('/:id', verifyRoles(ROLES_LIST.Guest), updatePost)

router.get('/', verifyRoles(ROLES_LIST.Guest), getAllPosts)

router.get('/:id', verifyRoles(ROLES_LIST.Guest), getSinglePost)

router.delete('/:id', verifyRoles(ROLES_LIST.Guest), deleteSinglePost)

router.delete('/', verifyRoles(ROLES_LIST.Guest), deleteAllPosts)



router.get('/:id/user', verifyRoles(ROLES_LIST.Guest), getPostUser)


// -------------------------EXPORT ROUTER-------------------------
module.exports = router