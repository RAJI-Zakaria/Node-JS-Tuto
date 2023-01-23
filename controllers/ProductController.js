const Order = require("../models").Order;
const User = require('../models').User
const Product = require('../models').Product

module.exports = {

    // create Product
    createProduct: (req, res) => {
        let { title, rating, UserId, PostId} = req.body

        Product.create({
            title
        }).then((product) => {
            return res.status(201).json({
                "message": "Product created successfully",
                product
            })
        }).catch(err => {
            return res.status(400).json({err}.err.errors[0].message);
        })
    },

    updateProduct: (req, res) => {
        let { firstName, age} = req.body
        let id = req.params.id

        Product.findOne({
            where: {id:id}
        }).then( product => {
            if (product){
                product.update({firstName, age})
                    .then((product) => {
                        return res.status(202).json({
                            "message": "Product updated successfully",
                            product
                        })
                    })
            }else{
                return res.status(206).json({
                    "message": "Product not found"
                })
            }
        }).catch(error => {
            return res.status(400).json({error}.err.errors[0].message)
        })
    },


    // get all Products
    getAllProducts: ( req, res ) => {
        Product.findAll( {
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

    // get single Product by id

    getSingleProduct:(req, res) => {
        let id = req.params.id

        Product.findByPk(id)
            .then((product) => {
                return res.status(200).json({product})
            }).catch(err => {
            return res.status(400).json({err})
        })
    },

// delete Product by id

    deleteSingleProduct: (req, res) => {
        let id = req.params.id

        Product.destroy({
            where: {id: id}
        }).then(() =>{
            return res.status(200).json({
                "message": "Product Deleted successfully"
            })
        }).catch(err =>{
            return res.status(400).json({error})
        })

    },

// delete all Products

    deleteAllProducts: (req, res) => {
        Product.destroy({
            truncate: true
        }).then(() => {
            return res.status(200).json({
                success: true,
                "message": "All Products deleted"
            })
        }).catch(err => {
            return res.status(400).json({
                err
            })
        })
    },




    //get Product's users :  by ProductID through Orders
    getProductUsers: (req, res) => {
        let id = req.params.id
        Product.findByPk(id, {
            include:  [
                {
                    model: Order,
                    as : 'Order',
                    include : [
                        {
                            model: User,
                            as : 'User',
                        }
                    ]
                }
            ]
        })
            .then((product) => {

                return res.status(200).json({product})


            }).catch(err => {
            return res.status(400).json({err})
        })
    },


    //get Product's product :  by ProductID
    getProductOrders: (req, res) => {
        let id = req.params.id

        Product.findByPk(id, {
            include: [
                {
                    model: Order,
                    as : 'Order'
                }
            ]
        })
            .then((product) => {

                return res.status(200).json({product})


            }).catch(err => {
            return res.status(400).json({err})
        })
    },


    //get Product's product :  by ProductID
    getProductWithPg: (req, res) => {
        let pageNumber = req.params.number
        let pageSize = 5;//display only 5 records
        Product.findAll({
            limit: pageSize,
            offset: (pageNumber-1)*pageSize,
        })
            .then((product) => {

                return res.status(200).json({product})


            }).catch(err => {
            return res.status(400).json({err})
        })
    },







}


 