const {server} = require("./server");


const { Server } = require("socket.io");


const IO = function () {
    //setting up the websocket...
    const io = new Server(server);

    return io;
};

IO.instance = null;

IO.getInstance = function () {
    if (this.instance === null) {
        this.instance = new IO();
    }

    return this.instance;
};

module.exports = IO.getInstance();
