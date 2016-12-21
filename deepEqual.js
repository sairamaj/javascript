// Your code here
function deepEqual(obj1,obj2){
  //console.log("obj1:"+ obj1 + " obj2:" + obj2);
  if( obj1 === obj2){
    return true;
  }

//console.log(Object.keys(obj1).length)
//console.log(Object.keys(obj1).length)
  if(Object.keys(obj1).length !== Object.keys(obj2).length){
    return false;
  }
  
  for(var key in obj1){
   // console.log(key);
    var val1 = obj1[key]
    var val2 = obj2[key];
    //  console.log("val1:" + val1 + "  val2" + val2);
      var ret = deepEqual(val1,val2);
      if( ret === false){
        return ret;
      }
  }

  return true;
}

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true