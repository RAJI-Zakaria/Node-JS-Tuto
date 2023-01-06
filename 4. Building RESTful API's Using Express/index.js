const express = require('express');//returns a function
const app = express();

const Joi = require('joi');

app.use(express.json())

const PORT = process.env.port || 3000
//HTTP verbs/methods
// app.get();
// app.post();
// app.put();
// app.delete();

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'},
    {id:4, name:'course1'}
]



app.get('/:name', (req,res)=>{
    res.send('Hello '+req.params.name)
})

app.get('/api/courses/', (req,res)=>{
    res.send(courses)
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

//Route Parameters | Queries ?sort=something
app.get('/api/user/:name/:id', (req,res)=>{
    //reading params
    //res.send(req.params);

    //reading queries
    res.send(req.query);
})





app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}....`);
});


//to run the app once ===> refreshing the page whenever changes occurs
//==>must install nodemon