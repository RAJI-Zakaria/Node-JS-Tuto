const express = require('express');//returns a function
const app = express();

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






app.listen(3000, ()=>{
    console.log('listening on port 3000....');
});


//to run the app once ===> refreshing the page whenever changes occurs
//==>must install nodemon