const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

// router import
const user = require('./routes/userRoute')
const home = require('./routes/home')

const startupDebugger = require('debug')('app:startup');


//Importing all models and verifying if there are equivalent on DB or not otherwise the orm will create them (tables) automatically... isn't that great ;) ....
//db.sequelize.sync().then((req)=>{
const db = require('./models');


app.use(express.json());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//setting the templating engine :
app.set('view engine', 'pug'); //this will load pug without "require".
app.set('views', './views')//default folder ==> root


// Routing
app.use('/api/users', user)

app.get("/", home);



// set port, listen for requests
const PORT = process.env.PORT || 3000;
db.sequelize.sync().then((req)=>{
    app.listen(PORT,()=>{
        startupDebugger("server running");
    })
})
