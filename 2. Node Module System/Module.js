// the global scope declaration might be a big problem, for example overriding the functions definition.
// every node application has at least one file or one module...

console.log(module);
//this returns :
/*

Module {
    id: '.',
        path: '...Tutos/Node/2. Node Module System',
        exports: {},
    filename: '...Tutos/Node/2. Node Module System/Module.js',
        loaded: false,
        children: [],
        paths: [
        '...Tutos/Node/2. Node Module System/node_modules',
        '...Tutos/Node/node_modules',
        '...Tutos/node_modules',
        '...node_modules',
        '...node_modules',
        '...node_modules',
        '...node_modules'
    ]
}


 */



//creating new module : logger : log messages to the cloud

