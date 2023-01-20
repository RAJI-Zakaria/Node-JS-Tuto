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

// -------------------------CUSTOM ROUTE-------------------------
router.post('/', createPost)

router.put('/:id', updatePost)

router.get('/', getAllPosts)

router.get('/:id', getSinglePost)

router.delete('/:id', deleteSinglePost)

router.delete('/', deleteAllPosts)



router.get('/:id/user', getPostUser)


// -------------------------EXPORT ROUTER-------------------------
module.exports = router