
//loading Module
//it's better to use const type instead of var or let so that we avoid assigning new values by errors
//this is going to show error at run time instead of compile time.
//in  other word your program will be much more robust... ;)
//const logger = require('./logger.js');

//loading multiple functions instead of object
const {log, sayHello} = require('./logger.js');

log('this is a new message');

sayHello('zakaria');



const Logger = require('./Extending-EventEmitter');
const logger = new Logger();
//registering new listener
logger.on('messageLogged', (arg)=>{
    console.log('listener called ', arg);
})


logger.log('message');