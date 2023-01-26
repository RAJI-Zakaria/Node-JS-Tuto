const jwt = require('jsonwebtoken');
const config = require('../config/config.json').development;

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        config.secret,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.email = decoded.UserInfo.email;
            req.roles = decoded.UserInfo.roles;


            next();
        }
    );



}

module.exports = verifyJWT