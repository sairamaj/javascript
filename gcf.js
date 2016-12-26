function findGcf(x,y){
    var min = Math.min(x,y)
    for(var i=min; i>2; i--){
        if( x%i==0 && y%i==0 ){
            return i;
        }
    }
    return NaN
}

console.log(findGcf(18,27))
console.log(findGcf(5,10))
