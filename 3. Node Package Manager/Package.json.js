//what is Package.json : it is a JSON file that contains basic information about your application such as its name version authors github repo, dependencies....
//while creating new project (npm init) : you will be asked about the name, version , description, author... of your project.



// how to install a package ?
// use npm i package-name

// Be aware that in old version of npm you mast add --save flag to save the package name in the package.json file
// anyway the new versions do not require the use of --save.

//package.json content :
// {
//     "dependencies": {
//     "underscore": "^1.13.6"
// }
// }



//using package :
const _ = require('underscore');

//core Module
//folder or file
//node_modules


let result = _.contains([1,2,3],2);

console.log(result);

//======================================================

//npm packages and source control :
//==>sharing the project with your team is very easy because all you need to do is to developed files alongside with the package.json
//==>this will allow the rest of the team to pull/download all dependencies files from the original server.

//======================================================

//Semantic Versioning :
//==>Ex of version :  Z.X.Y ===> Major.Minor.Patch
//==> Caret ^ : used to fix the major version of a dependency Ex : 5.X.Y
//==> Tilde ~ : used to fix the major and minor versions of a dependency Ex : 5.2.Y
//==>the patch number is used to indicated that some bugs had been fixed

//==>Note : in some cases it's not recommended to use the ^ or ~ because sometimes new updates can break old functionalities.



//======================================================


//to show the version of dependencies :
//==>check the package.json file
//==>use terminal : npm list
//==>use terminal : npm list --depth=0 // show installed dependencies (root folder)

//======================================================

//Viewing Registry Info for a Package :
//==>npm view mongoose dependencies
//==>npm view mongoose versions

//======================================================

//Installing a Specific Version of a Package :
//==> npm i mongoose@2.4.2

//======================================================

//Updating Local Packages :
//==>npm outdated
//==>npm update

//======================================================

//if you want to update all dependencies to the latest versions, we can use npm-check-updates
//==>sudo npm i -g npm-check-updates
//==> ncu -u

//======================================================

//DevDependencies :
//==> we will install jshint as an example which will be used only in a dev mode.
//==> npm i jshint --save-dev

//======================================================

//uninstall a package :
//==>npm un mongoose
//==>npm uninstall mongoose

//======================================================

//Global Packages
//npm is one example
//you can install package globally using the flag -g : npm i -g npm

