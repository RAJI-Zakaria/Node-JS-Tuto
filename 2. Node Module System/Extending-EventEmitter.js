const EventEmitter = require('events');
//using the next instance <emitter> is not a good idea because we will have new instances in different files which means that emitter will not work as expected.....
//const emitter = new EventEmitter();
//as a result it's better to create a class and inherit from the EventEmitter mother class


class Logger extends EventEmitter{
    log(message){
        console.log(message);
        this.emit('messageLogged', {id:1, url: 'http://'});
    }

}

module.exports = Logger;