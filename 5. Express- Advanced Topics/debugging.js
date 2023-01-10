//Most of the time as a developer we need to log some messages for a purpose of debugging
//as a result it's better to use a debugging package such as "debug".
//this package help to distinguish between different logs using name-spaces and colors... ;)

//install debug
//==> npm i debug

//import debug page with a specific name space :
//==> const startupDebugger = require('debug')('app:startup');

//log message
//==> startupDebugger('morgan is enabled');

//activate/select debug name space to use while debugging :
//==> export DEBUG=app:startup
//==> export DEBUG=app:startup,app:db
//==> export DEBUG=app:*

//Note : we can set the level/name-space of debugging without the "export" :
//===> DEBUG=app:db nodemon app.js

//PLEASE check the app.js for demo