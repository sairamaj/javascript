function findLcm(x,y){
    var max = Math.max(x,y)
    for(var i=max; ; i++){
        if( i%x==0 && i%y==0 ){
            return i;
        }
    }
    return NaN
}

console.log(findLcm(18,27))
console.log(findLcm(5,10))
