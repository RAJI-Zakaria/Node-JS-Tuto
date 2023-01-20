const Post = require('../models').Post
const User = require('../models').User


module.exports = {

    // create post
    createPost: (req, res) => {
        let { firstName, age} = req.body

        Post.create({
            firstName,
            age
        }).then((Post) => {
            return res.status(201).json({
                "message": "Post created successfully",
                post
            })
        }).catch(err => {
            return res.status(400).json({err}.err.errors[0].message);
        })
    },

    updatePost: (req, res) => {
        let { firstName, age} = req.body
        let id = req.params.id

        Post.findOne({
            where: {id:id}
        }).then( post => {
            if (post){
                post.update({firstName, age})
                    .then((updatePost) => {
                        return res.status(202).json({
                            "message": "Post updated successfully",
                            updatePost
                        })
                    })
            }else{
                return res.status(206).json({
                    "message": "Post not found"
                })
            }
        }).catch(error => {
            return res.status(400).json({error}.err.errors[0].message)
        })
    },


    // get all Posts
    getAllPosts: ( req, res ) => {
        Post.findAll( {
            // attributes: ['id', 'firstName', 'age'],
            // limit: 5,
            // order: [['id', 'DESC']]
        }).then(posts => {
            return res.status(200).json({
                posts
            })
        }).catch(err => {
            return res.status(400).json({err}.err.errors[0].message);
        })
    },

    // get single Post by id

    getSinglePost:(req, res) => {
        let id = req.params.id

        Post.findByPk(id)
            .then((post) => {
                return res.status(200).json({post})
            }).catch(err => {
            return res.status(400).json({err})
        })
    },

// delete Post by id

    deleteSinglePost: (req, res) => {
        let id = req.params.id

        Post.destroy({
            where: {id: id}
        }).then(() =>{
            return res.status(200).json({
                "message": "Post Deleted successfully"
            })
        }).catch(err =>{
            return res.status(400).json({error})
        })

    },

// delete all Posts

    deleteAllPosts: (req, res) => {
        Post.destroy({
            truncate: true
        }).then(() => {
            return res.status(200).json({
                success: true,
                "message": "All Posts deleted"
            })
        }).catch(err => {
            return res.status(400).json({
                err
            })
        })
    },




    //get post's user :  by postID
    getPostUser: (req, res) => {
        let id = req.params.id

        Post.findByPk(id, {
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






}



function getUser(id){
    User.findByPk(id)
        .then((post) => {
            let user = post.getAllUsers();
            return res.status(200).json({user})
        }).catch(err => {
        return res.status(400).json({err})
    })
}