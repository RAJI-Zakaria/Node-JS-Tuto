//singleton : will make it easy to re-use/share the same instance in different module without having to create new instances...
//Ex : we need to use the same socket instance to be able to manage events/listener...
const {app, server} = require("./singleton/server");
const io = require("./singleton/socket");
const connectionMap = require("./singleton/connectionMap");

const process = require('process');

const cors = require('cors');
const corsOptions = require('./_helpers/corsOptions');

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];




const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


// middleware importation
const errorHandler = require('./middleware/error-handler')
const verifyJWT = require('./middleware/verifyJWT')
const verifySocketJWT = require('./middleware/verifySocketJWT')

// routes importation
const user = require('./routes/userRoute')
const post = require('./routes/postRoute')
const comment = require('./routes/commentRoute')
const product = require('./routes/productRoute')
const home = require('./routes/home')
const auth = require('./routes/authRoute')

//serverIp
const startupDebugger = require('debug')('app:startup');


//Importing all models and verifying if there are equivalent on DB or not otherwise the orm will create them (tables) automatically... isn't that great ;) ....
//db.sequelize.sync().then((req)=>{
const db = require('./models');


// Cross Origin Resource Sharing
app.use(cors(corsOptions));
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
app.use('/api/products', product)
app.use('/api/auth', auth)


//Middleware :
//checking for token ==> if token not valid user can't have access to the following endpoints
app.use(verifyJWT);



app.use('/api/users', user)
app.use('/api/posts', post)
app.use('/api/comments', comment)




//page not found  :
app.all('*', (req, res) => {
    return res.status(404).json({ message: 'Page not found' })
}).post


io.use(verifySocketJWT);

//Setting up socket io to listen to events
io.on('connection', (socket) => {
    console.log('a user connected --> id : '+socket.id);
    require('./listeners')(socket);

    //saving the sockets for further manipulation...
    connectionMap.add(socket.id, socket);
    // socket.on('CH01', function (from, msg) {
    //     console.log('MSG', from, ' saying ', msg);
    // });

});



// global error handler
app.use(errorHandler);


// set port, listen for requests
const PORT = config.serverPort;
const SERVERIP = config.serverIp;
db.sequelize.sync().then((req)=>{
    server.listen(PORT, SERVERIP, ()=>{
        startupDebugger("server running");
    })
})
