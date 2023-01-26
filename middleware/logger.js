

function log(req,res,next){
    console.log('Logging...');
    //if next() not used, the app will hang in there... will not respond to the request
    next();
}

module.exports = log;