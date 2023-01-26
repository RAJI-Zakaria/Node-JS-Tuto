
const User = require('../models').User

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const config = require('../config/config.json').development;



const login = async (req, res) => {

    const { email, password } = req.body;
    //no data ==> return error
    if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    //Searching for the user on database.

    User.findOne({
        where: {email:email}
    }).then( user => {
        if (user){ //everything is alright...
            let foundUser = {user}.user.dataValues;

            // evaluate password
            bcrypt.compare(password, foundUser.password).then(match =>{
                if (match) {
                    //TODO: must add roles to the User model
                    // create roles table which will contain the same roles as the roles.js file Roles(id, name, code...) ==> ManyToMany : UserRoles(UserId, RoleId, ..[we can add #ExpiringDate]..)
                    // this is going to be used in the middleware verifyRoles.js
                    foundUser.roles = [
                        1777,//Admin
                        1666,//User
                    ];

                    const roles = foundUser.roles;
                    // create JWTs
                    const accessToken = jwt.sign(
                        {
                            "UserInfo": {
                                "email": foundUser.email,
                                "roles": roles
                            }
                        },
                        config.secret,
                        { expiresIn: config.tokenLifeDuration }
                    );


                    const refreshToken = jwt.sign(
                        { "email": foundUser.email },
                        config.secret,
                        { expiresIn: config.refreshTokenLifeDuration }
                    );


                    // Saving refreshToken with current user
                    User.update(
                        {
                            ...foundUser,
                            refreshToken
                        },
                        {
                            where: { id: foundUser.id }
                        }
                    ).then(result =>
                        //TODO: must specify 40X error
                    //TODO: can't roll back ? in case of error
                        console.log(result)
                    )
                    .catch(err =>
                        console.log(err)
                    )


                    //this is going to be used  in the refreshing controller
                    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });


                    res.json({ accessToken });
                } else {
                    res.sendStatus(401);
                }

            });

            //endOf if(user)



        }else{
            return res.sendStatus(401); //Unauthorized
            // return res.status(206).json({
            //     "message": "User not found"
            // })
        }
    }).catch(error => {
        return res.status(400).json({error}.err.errors[0].message)
    })


}




const register = async (req, res) => {
    console.log("register----------------")

    const {
        firstName,
        age,
        email,
        password
    } = req.body;

    //no data ==> return error
    if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    // check for duplicate usernames in the db
    User.findOne({
        where: {email:email}
    }).then( duplicate => {
        if (duplicate){
            return res.sendStatus(409); //Conflict : user already exists
        }else{
            bcrypt.hash(password, 10).then(hash=>{
                console.log(hash);
                if(hash){
                    //store the new user
                    User.create({
                        firstName,
                        age,
                        email,
                        password:hash //password
                    }).then((user) => {
                        if(user)
                            return res.status(201).json({
                                "message": "User created successfully",
                                user
                            })
                    }).catch(err => {
                        return res.status(400).json({err}.err.errors);
                    })

                }
            });
        }
    }).catch(error => {
        return res.status(400).json({error}.err.errors[0].message)
    })


}

const logout = async (req, res) => {
    // On client, also delete the accessToken
    const cookies = req.cookies;
    console.log(req.cookies)
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;
    // Is refreshToken in db?
    User.findOne({
        where: {refreshToken:refreshToken}
    }).then( foundUser => {
        if (!foundUser) {
            foundUser.refreshToken="";
            User.update(
                {
                    ...foundUser
                },
                {
                    where: { refreshToken: refreshToken }
                }
            ).then( foundUser => {
                if (!foundUser) {
                    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
                    return res.sendStatus(204);
                }
            }).catch(error => {
                return res.status(400).json({error}.err.errors[0].message)
            })

        }
    }).catch(error => {
        return res.status(400).json({error}.err.errors[0].message)
    })

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);

}


const refreshToken = (req, res) => {

    const cookies = req.cookies;
    console.log(cookies);
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;


    //Searching for the user on database.
    User.findOne({
        where: {refreshToken: refreshToken}
    }).then( user => {
        if (user){ //everything is alright...
            let foundUser = {user}.user.dataValues;

            // evaluate jwt
            jwt.verify(
                refreshToken,
                config.secret,
                (err, decoded) => {
                    if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
                    //TODO: must add roles to the User model
                    foundUser.roles = [
                        1777,//Admin
                        1666,//User
                    ];

                    const roles = foundUser.roles;
                    const accessToken = jwt.sign(
                        {
                            "UserInfo": {
                                "email": decoded.email,
                                "roles": roles
                            }
                        },
                        config.secret,
                        { expiresIn: config.tokenLifeDuration }
                    );
                    res.json({ accessToken })
                }
            );



        }else{
            return res.sendStatus(403); //Forbidden
            // return res.status(206).json({
            //     "message": "User not found"
            // })
        }
    }).catch(error => {
        return res.status(400).json({error}.err.errors[0].message)
    })




}




module.exports = { login, register, logout, refreshToken };