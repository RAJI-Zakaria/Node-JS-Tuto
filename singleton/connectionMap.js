
const connectionMap = function connectionMap(){
    //Explanation :
    //here i am going to use some sort of Map() or Object format instead of array
    //because the worst case array will take O(N) time to fetch data
    //while with object (map) you can have constant time O(1)
    //also if we use array it will take too much space in the memory ==> why ?

    //imagine we use array : simpleArr = [];
    //simpleArr[3]="record1"
    //simpleArr[20]="record2"

    //this will create empty spaces in our array which is not good at all.
    //Ex : (21)[empty × 2, "record1", empty × 17, "record2"]


    const socketList = {};

    //saving new connections
    this.add = function(userId, socket){
        if(!socketList[userId]){
            socketList[userId] = socket;
        }
    };
    //removing new connections
    this.remove = function(userId){
        if(socketList[userId]){
            delete socketList[userId];
        }
    };

    //getting all connections
    this.getSocketList = function(){
        return socketList;
    };

    if(connectionMap.caller != connectionMap.getInstance){
        throw new Error("This object cannot be instanciated");
    }
}

connectionMap.instance = null;

connectionMap.getInstance = function(){
    if(this.instance === null){
        this.instance = new connectionMap();
    }
    return this.instance;
}

module.exports = connectionMap.getInstance();
 
