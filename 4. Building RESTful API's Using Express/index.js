const express = require('express');//returns a function
const app = express();

const PORT = process.env.port || 3000
//HTTP verbs/methods
// app.get();
// app.post();
// app.put();
// app.delete();


app.get('/:name', (req,res)=>{
    res.send('Hello '+req.params.name)
})

app.get('/api/courses/', (req,res)=>{
    res.send([1,2,3])
})


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