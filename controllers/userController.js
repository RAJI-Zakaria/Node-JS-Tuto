const Post = require("../models").Post;
const User = require('../models').User
const Product = require("../models").Product;


module.exports = {

    // create account
    signUp: (req, res) => {
        let { firstName, age} = req.body

        User.create({
            firstName,
            age
        }).then((user) => {
            return res.status(201).json({
                "message": "User created successfully",
                user
            })
        }).catch(err => {
            return res.status(400).json({err}.err.errors[0].message);
        })
    },

    updateSignUp: (req, res) => {
        let { firstName, age} = req.body
        let id = req.params.id

        User.findOne({
            where: {id:id}
        }).then( user => {
            if (user){
                user.update({firstName, age})
                    .then((updateUser) => {
                        return res.status(202).json({
                            "message": "User updated successfully",
                            updateUser
                        })
                    })
            }else{
                return res.status(206).json({
                    "message": "User not found"
                })
            }
        }).catch(error => {
            return res.status(400).json({error}.err.errors[0].message)
        })
    },


    // get all users
    getAllUsers: ( req, res ) => {
        User.findAll( {
            attributes: ['id', 'firstName', 'age'],
            limit: 5,
            order: [['id', 'DESC']]
        }).then(users => {
            return res.status(200).json({
                users
            })
        }).catch(err => {
            return res.status(400).json({err}.err.errors[0].message);
        })
    },

    // get single user by id

    getSingleUser:(req, res) => {
        let id = req.params.id

        User.findByPk(id)
            .then((user) => {
                return res.status(200).json({user})
            }).catch(err => {
            return res.status(400).json({err})
        })
    },

// delete user by id

    deleteSingleUser: (req, res) => {
        let id = req.params.id

        User.destroy({
            where: {id: id}
        }).then(() =>{
            return res.status(200).json({
                "message": "User Deleted successfully"
            })
        }).catch(err =>{
            return res.status(400).json({error})
        })

    },

// delete all users

    deleteAllUsers: (req, res) => {
        User.destroy({
            truncate: true
        }).then(() => {
            return res.status(200).json({
                success: true,
                "message": "All Users deleted"
            })
        }).catch(err => {
            return res.status(400).json({
                err
            })
        })
    },




    //get user's posts :  by userID
    getUserPosts: (req, res) => {
        let id = req.params.id

        User.findByPk(id,{
            include: [
                {
                    model: Post,
                    as : 'posts'
                }
            ]
        })
            .then((post) => {

                return res.status(200).json({post})


            }).catch(err => {
            return res.status(400).json({err})
        })
    },




    //get user's Orders :  by userID
    getUserOrders: (req, res) => {
        let id = req.params.id

        User.findByPk(id,{
            include: [
                {
                    model: Product,
                    as : 'Product'
                }
            ]
        })
            .then((user) => {

                return res.status(200).json({user})


            }).catch(err => {
            return res.status(400).json({err})
        })
    },








}