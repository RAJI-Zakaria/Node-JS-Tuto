

const listenersDebugger = require('debug')('app:listeners:log');

const chatListener = (socket) => {
    socket.on('CH01', function (from, msg) {
        listenersDebugger('MSG----> ', from, ' saying ', msg);
    });

}

module.exports = chatListener;