const EventEmitter = require('events'); // it's a class based on the naming convention
const emitter = new EventEmitter();


//registering a listener :
// emitter.addListener()
emitter.on('messageLogged', function(){
    console.log('listener called');
});

//Raise an event
emitter.emit('messageLogged');
//emit means making a noise , produce - signalling... event has happened..



//note : Order is important ==> registering a listener then raising an event