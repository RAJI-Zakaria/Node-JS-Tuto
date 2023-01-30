const express = require("express");
const http = require('http');


//why use singleton ?
//  i need the "app" instance for the socket singleton.
const Server = function singleton(){

    const app = express();
    //Import Middleware
    app.use(express.json());

    let server = http.createServer(app);
    return {app, server};
}

Server.instance = null;

Server.getInstance = function(){
    if(this.instance === null){
        this.instance = new Server();
    }
    return this.instance;
}

module.exports = Server.getInstance();