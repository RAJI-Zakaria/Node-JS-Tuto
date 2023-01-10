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



const Joi = require('joi');

const logger = require('./logger.js');
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

const courses = [
    {id:1,name:"course1"},
    {id:2,name:"course2"},
    {id:3,name:"course3"}
];



app.get('/api/courses', (req,res)=>{
    res.send(courses);
})



app.get('/api/courses/:id', (req,res)=>{
    const course = courses.find((c) => c.id===parseInt(req.params.id))
    if(!course)//return 404
        res.status(404).send('the course with the giving id was not found')

    res.send(course)
})


app.post('/api/courses', (req,res)=>{
    //validating
    const {error} = validateCourse(req.body);
    //checking the value of our property "name" :
    if(error){//not null == error occurs
        //it's better to send a specific error data instead of sending the whole object Ex : rs.error ==> rs.error.details[0].message
        //note : we can concatenate selected error data.
        res.status(400).send(error.details[0].message);
        //die or exit
        return;
    }
    //in order for the "body" to work we must use expressJson middleware
    const course = {
        id:courses.length+1,
        name:req.body.name
    }
    courses.push(course);
    //return the new course with id to the client
    res.send(course);
})

app.put('/api/courses/:id', (req,res)=>{
    //Look up the course by id
    //if not existing, return 404
    const course = courses.find((c) => c.id===parseInt(req.params.id))
    if(!course)//return 404
    {
        res.status(404).send('the course with the giving id was not found')
        return;
    }

    //validate
    //If invalid, return 400 - Bad request
    //using object destructuring { ... }
    const {error} = validateCourse(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    //update course
    //return the updated course
    course.name=req.body.name;
    res.send(course);
})

app.delete('/api/courses/:id', (req,res)=>{

    const course = courses.find((c) => c.id===parseInt(req.params.id))

    if(!course) return res.status(404).send('the course with the giving id was not found')


    //Delete
    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);


});

function validateCourse(course){
    const schema = Joi.object({
        name:Joi.string().min(3).required()
    })

    return schema.validate(course);
}




app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}....`);
});