
var url = 'http://mylogger.io/log';

function log(message){
    //send an HTTP request ==> methode will be shown in the next tutorials... lets keep it simple here.
    console.log(message);
}

function sayHello(name){
    //send an HTTP request ==> methode will be shown in the next tutorials... lets keep it simple here.
    console.log('Hello '+name);
}

//exporting the methode/function
// module.exports.log = log;

//exporting the url ==> it will be accessible using the name "endPoint" instead of url
// module.exports.endPoint = url;

module.exports = {log, sayHello};