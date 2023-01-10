//A middleware function is a function that takes a request object and either terminates the request/response cycle or passes control to another middleware function.
//its used to handle

//loading debug
//arbitrary name space : app:startup
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const config = require('config');

const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');

const courses = require('../routes/courses');
const home = require('../routes/home');



const Joi = require('joi');


//setting the templating engine :
app.set('view engine', 'pug'); //this will load pug without "require".
app.set('views', './views')//default folder ==> root

const logger = require('../middleware/logger');
const PORT = process.env.port || 3000

// console.log(`NODE_ENV : ${process.env.NODE_ENV}`);//returns undefined : means must set it manually.
// console.log(`ENV : ${app.get('env')}`); //by default : development
//to change the NODE_ENV to production you can run on terminal : exports NODE_ENV=production


//express.json() : returns a middleware function.....
app.use(express.json());

//read request with url encoded payload : must provide extended:true to pass arrays and complexe object
app.use(express.urlencoded({extended:true})); //in POSTMAN We can use x-www-form-urlencoded instead of raw json format

//static assets middleware : css, images....
app.use(express.static(__dirname + '/public')); // onn navigator/postman : http://localhost:3000/readme.txt

/*
    - Please note that using other third party middleware can have a bad impact on the performance of your application.
    - as a result do not add any middleware unless if you're indeed in need of using it.
 */

//Helmmet enhances the security of your application against many vulnerabilities such XSS...
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

//configuration :
console.log(`Application NAME : ${config.get('name')}`)
console.log(`Application SERVER : ${config.get('mail.host')}`)
//TODO : Bug config.get('mail.password') returns error
//console.log(`Application PASSWORD : ${config.get('mail.password')}`)

//morgan is used to log HTTP requests and errors, and simplifies the process , you can log information based on a specific format such :
//verb endpoint code_resp - time_execution ===> 'tiny'
if(app.get('env') === 'development'){//Enhancing performance on production
    app.use(morgan('tiny'));
    // console.log("morgan is enabled");
    startupDebugger('morgan is enabled');
}

//Example connecting to the DB ==> debugger log
dbDebugger("connecting to the DB....");

//we are talking about request processsing pipeline : contains differents middleware such json() & route()....
//this concept is meant to be used for loggin, authorization....

//Creating a middleware fucntion :
app.use(logger)











app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}....`);
});