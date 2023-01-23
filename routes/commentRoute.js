const express = require('express')
const router = express.Router()
const {
    createComment,
    updateComment,
    getAllComments,
        getSingleComment,
    deleteSingleComment,
        deleteAllComments,
    getCommentUser,
    getCommentPost

} = require('../controllers/commentController')

// -------------------------CUSTOM ROUTE-------------------------
router.post('/', createComment)

router.put('/:id', updateComment)

router.get('/', getAllComments)

router.get('/:id', getSingleComment)

router.delete('/:id', deleteSingleComment)

router.delete('/', deleteAllComments)



router.get('/:id/user', getCommentUser)

router.get('/:id/post', getCommentPost)


// -------------------------EXPORT ROUTER-------------------------
module.exports = router