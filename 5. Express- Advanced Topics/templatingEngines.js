
// Templating engines used to return HTML markup to the client.
// Examples : Pug, EJS and Mustache are the most popular ones.

//install pug
//==> npm i pug

//importing the package :
//==>app.set('view engine', 'pug'); //this will load pug without "resquire".
//==>app.set('views', './views') //default folder ==> root


//create views folder containing files (Ex : index.pug)

//rendering the mug file to client as html
//===> res.render('index', {title:"Zak's Howdy", message:"Hello"});

//PLEASE check the app.js for demo