const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

// router import
const user = require('./routes/userRoute')

const startupDebugger = require('debug')('app:startup');


//Importing all models and verifying if there are equivalent on DB or not otherwise the orm will create them (tables) automatically... isn't that great ;) ....
//db.sequelize.sync().then((req)=>{
const db = require('./models');


app.use(express.json());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routing
app.use('/api', user)


// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to  application." });
});



// set port, listen for requests
const PORT = process.env.PORT || 3000;
db.sequelize.sync().then((req)=>{
    app.listen(PORT,()=>{
        startupDebugger("server running");
    })
})
