const Post = require("../models").Post;
const User = require('../models').User
const Product = require("../models").Product;
const Order = require("../models").Order;
const config = require(__dirname + '/../config/config.json').development;

console.log(config);

module.exports = {

    // create account
    signUp: (req, res) => {
        let { firstName, age, email, password} = req.body
        //TODO: check if the user exist ?
        User.findOne({email:email})
            .then((user) => {
                if(user) return res.status(500).json({"msg":"User already registered"})
            }).catch(err => {
            return res.status(400).json({err})
        })



        User.create({
            firstName,
            age,
            email,
            password
        }).then((user) => {
            if(user)
            return res.status(201).json({
                "message": "User created successfully",
                user
            })
        }).catch(err => {
            return res.status(400).json({err}.err.errors);
        })
    },

    // create account
    login: (req, res) => {
        let { email, password} = req.body

        User.findOne({
            where: {
                email:email
            }
            })
            .then((user) => {
                console.log({user
                });
                if (user) {
                    user.role="Admin";
                    const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
                    const { password, ...userWithoutPassword } = user;
                    return res.status(200).json({
                        ...userWithoutPassword,
                        token
                    });
                }
            }).catch(err => {
            return res.status(400).json({err})
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
            // attributes: ['id', 'firstName', 'age'],
            limit: 5,
            order: [['id', 'DESC']]
        }).then(users => {
            return res.status(200).json({users}.users)
        }).catch(err => {
            return res.status(400).json({err}.err.errors[0].message);
        })
    },

    // get single user by id

    getSingleUser:(req, res) => {
        let id = req.params.id

        User.findByPk(id)
            .then((user) => {
                return res.status(200).json({user}.user)
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



    /*
    THE NEXT FUNCTION WILL RETURN :  getUserOrders
    {
    "user": {
        "id": 1,
        "firstName": "zakaria",
        "age": 25,
        "createdAt": "2023-01-10T14:09:48.000Z",
        "updatedAt": "2023-01-10T14:09:48.000Z",
        "Order": [
            {
                "id": 13,
                "Quantity": 43,
                "createdAt": "2023-01-23T10:23:56.000Z",
                "updatedAt": "2023-01-23T10:23:56.000Z",
                "UserId": 1,
                "ProductId": 3,
                "Product": {
                    "id": 3,
                    "title": "banane"
                }
            },
             ....
        ]
    }
}
     */

    //get user's Orders :  by userID
    getUserOrders: (req, res) => {
        let id = req.params.id

        User.findByPk(id,{
            include: [
                {
                    model: Order,
                    as : 'Order',
                    include : [
                        {
                            model: Product,
                            as : 'Product',
                        }
                    ]
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