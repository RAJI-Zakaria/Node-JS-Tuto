const Comment = require('../models').Comment
const User = require('../models').User
const Post = require('../models').Post


module.exports = {

    // create post
    createComment: (req, res) => {
        let { title, rating, UserId, PostId} = req.body

        Comment.create({
            title,
            rating,
            UserId:UserId,
            PostId:PostId,
        }).then((Comment) => {
            return res.status(201).json({
                "message": "Comment created successfully",
                post
            })
        }).catch(err => {
            return res.status(400).json({err}.err.errors[0].message);
        })
    },

    updateComment: (req, res) => {
        let { firstName, age} = req.body
        let id = req.params.id

        Comment.findOne({
            where: {id:id}
        }).then( post => {
            if (post){
                post.update({firstName, age})
                    .then((updateComment) => {
                        return res.status(202).json({
                            "message": "Comment updated successfully",
                            updateComment
                        })
                    })
            }else{
                return res.status(206).json({
                    "message": "Comment not found"
                })
            }
        }).catch(error => {
            return res.status(400).json({error}.err.errors[0].message)
        })
    },


    // get all Comments
    getAllComments: ( req, res ) => {
        Comment.findAll( {
            // attributes: ['id', 'firstName', 'age'],
            // limit: 5,
            // order: [['id', 'DESC']]
        }).then(comments => {
            return res.status(200).json({
                comments
            })
        }).catch(err => {
            return res.status(400).json({err}.err.errors[0].message);
        })
    },

    // get single Comment by id

    getSingleComment:(req, res) => {
        let id = req.params.id

        Comment.findByPk(id)
            .then((post) => {
                return res.status(200).json({post})
            }).catch(err => {
            return res.status(400).json({err})
        })
    },

// delete Comment by id

    deleteSingleComment: (req, res) => {
        let id = req.params.id

        Comment.destroy({
            where: {id: id}
        }).then(() =>{
            return res.status(200).json({
                "message": "Comment Deleted successfully"
            })
        }).catch(err =>{
            return res.status(400).json({error})
        })

    },

// delete all Comments

    deleteAllComments: (req, res) => {
        Comment.destroy({
            truncate: true
        }).then(() => {
            return res.status(200).json({
                success: true,
                "message": "All Comments deleted"
            })
        }).catch(err => {
            return res.status(400).json({
                err
            })
        })
    },




    //get Comment's user :  by CommentID
    getCommentUser: (req, res) => {
        let id = req.params.id

        Comment.findByPk(id, {
            include: [
                {
                    model: User,
                    as : 'User'
                }
            ]
        })
            .then((post) => {

                return res.status(200).json({post})


            }).catch(err => {
            return res.status(400).json({err})
        })
    },


    //get Comment's post :  by CommentID
    getCommentPost: (req, res) => {
        let id = req.params.id

        Comment.findByPk(id, {
            include: [
                {
                    model: Post,
                    as : 'Post'
                }
            ]
        })
            .then((post) => {

                return res.status(200).json({post})


            }).catch(err => {
            return res.status(400).json({err})
        })
    },






}


 