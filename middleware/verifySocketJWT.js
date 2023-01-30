const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const verifySocketJWT = (socket, next)=>{
    if (socket.handshake.auth && socket.handshake.auth.token){
        console.log(socket.handshake.auth)
        jwt.verify(socket.handshake.auth.token, config.secret, function(err, decoded) {
            if (err) return next(new Error('Authentication error'));
            socket.decoded = decoded;
            next();
        });
    }
    else {
        next(new Error('Authentication error'));
    }
}


module.exports = verifySocketJWT;