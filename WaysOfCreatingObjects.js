///////////////////////////////////////
//  Using function to create new object.
//  In essence functions when used with the keyword new behave like factories, 
//  meaning that they create new objects
//      we call this an instance of the function.
//  Convention is to use Capital letter for the function name indicating that they create objects 
//  ( vs other functions which does something)
///////////////////////////////////////
function Person(){
    this.name = "sai"       // this keyword is important
    // return is implicit when new key word is used.
}

var p1 = new Person()        // new keyword is important
console.log(p1)

///////////////////////////////////////////////////////
//  Another way of creating object is using literals
///////////////////////////////////////////////////////

var p2 = {
    name:"ram", age:13
}
console.log(p2)

