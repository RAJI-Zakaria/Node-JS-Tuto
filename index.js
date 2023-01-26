const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const authenticate = require('./middleware/authenticate');


const errorHandler = require('./middleware/error-handler');
const verifyJWT = require('./middleware/verifyJWT');

// router import
const user = require('./routes/userRoute')
const post = require('./routes/postRoute')
const comment = require('./routes/commentRoute')
const product = require('./routes/productRoute')
const home = require('./routes/home')
const auth = require('./routes/authRoute')

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


//middleware for cookies
//will be used later to store/receive the Jwt tokens "cookies"
app.use(cookieParser());


// Routing
app.get("/", home);
app.use('/api/auth', auth)


//Middleware :
//checking for token ==> if token not valid user can't have access to the following endpoints
app.use(verifyJWT);

app.use('/api/users', user)
app.use('/api/posts', post)
app.use('/api/comments', comment)
app.use('/api/products', product)




//page not found  :
app.all('*', (req, res) => {
    return res.status(404).json({ message: 'Page not found' })
}).post




// global error handler
app.use(errorHandler);


// set port, listen for requests
const PORT = process.env.PORT || 3000;
db.sequelize.sync().then((req)=>{
    app.listen(PORT,()=>{
        startupDebugger("server running");
    })
})
