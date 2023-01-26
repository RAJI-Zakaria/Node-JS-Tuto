const jwt = require('express-jwt');
const { secret } = require('../config/config.json');

module.exports =authenticateToken;

function authenticateToken(req, res, next) {

    console.log("authenticateToken\n");
    next()

    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    //
    // if (token == null) return res.sendStatus(401)
    //
    // jwt.verify(token, secret, (err, user) => {
    //     console.log(err)
    //
    //     if (err) return res.sendStatus(403)
    //
    //     req.user = user
    //
    //     next()
    // })
}