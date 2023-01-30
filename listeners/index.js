'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const listenersDebugger = require('debug')('app:listeners');


const LoadListeners = (socket)=>{

    fs
        .readdirSync(__dirname)
        .filter(file => {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        })
        .forEach(file => {
            listenersDebugger('Loading listener : '+file);
            require(path.join(__dirname, file))(socket);
        });
}

module.exports = LoadListeners;