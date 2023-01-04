// console.log(); //global
//
// setTimeout();
// clearTimeout();
//
// setInterval();
// clearInterval();

// ==> window is a global scope
//window.console.log();


var MyMessage = 'Hi Zak';
//this variable will be added directly to the window object
//window.MyMessage ==> navigator

//in Node we have global instead of window but it's the previous variable is not going to be added to the global object.
//in another word variables are only scooped inside the current file (EX : Global-objects.js)
console.log(global.MyMessage); // it'll show undefined