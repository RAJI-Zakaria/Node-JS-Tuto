const os = require('os');


var totalMemory = os.totalmem();
var freeMemory = os.freemem();


console.log(`Total Memory : ${totalMemory}`)
console.log(`Free Memory : ${freeMemory}`)


//template string (ECMAScript 6) : without concatenation
//using the back tick character : `
//Ex :  `Free Memory : ${myVariable}`