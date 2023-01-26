
const User = require('../models').User
const config = require(__dirname + '/../config/config.json').development;

const jwt = require('express-jwt');


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
        //TODO : use joi to validate the inputs

        // Read username and password from request body
        let { email, password} = req.body

        // Filter user from the users table by username and password
        User.findOne()
            .then((user) => {
                if (user) {
                    let usr = user.dataValues;
                    usr.role="Admin";

                    // Generate an access token
                    const token = jwt.sign({ id: usr.id, username: usr.id, role: usr.role },  config.secret);

                    console.log(config.secret)

                    const { password, ...userWithoutPassword } = usr;
                    return res.status(200).json({
                        ...userWithoutPassword,
                        token
                    });
                }
            }).catch(err => {
            return res.status(400).json({err})
        })



    },

    forgetPass: (req, res) => {

    },


    resetPass: (req, res) => {

    },


    logout: (req, res) => {

    },










}