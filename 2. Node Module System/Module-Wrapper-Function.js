//if we make an error at the very first line such : var x =;
//an error will be shown here indicating "SyntaxError: Unexpected token ';'"
//also it will show the next wrapper :
// (function (exports, require, module, __filename, __dirname){ var x = ;.....rest of your program....})
//Explanation  :: Before executing our code, Node wrap it up inside a function
//to convince you more you can for example log the name/path of the current file using the last two arguments
console.log(__dirname);
console.log(__filename);
console.log(require);

//.........etc.