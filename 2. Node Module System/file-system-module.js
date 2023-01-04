const fs = require('fs');
//
// //synchronous methode
// var files = fs.readdirSync('./');//return all files in the path ./
// console.log(files);

//asynchronous methode
//using a call back function with the arrow key
fs.readdir('./2. Node Module System',(err, files2)=> {
    if(err){
        console.log(`error : ${err}`);
    }else{
        console.log(files2);
    }
});//return all files in the path ./
