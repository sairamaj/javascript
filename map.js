var array = [1,2,3,4,5,6]

var doubleArray = array.map(x=>{
    return x*2;
})

console.log(doubleArray)

doubleArray.forEach(d=> console.log(`d is:${d}`))