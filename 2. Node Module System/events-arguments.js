const EventEmitter = require('events'); // it's a class based on the naming convention
const emitter = new EventEmitter();


//registering a listener :
emitter.on('messageLogged', (evArg) => { // evArg = {id, name...}
    console.log('listener called');
    console.log(evArg);
});

const eventArg = {
    id:1,
    name:'zakaria',
    age:99
}
//Raise an event
emitter.emit('messageLogged', eventArg);

