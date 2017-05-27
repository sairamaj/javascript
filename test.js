var person={}
console.log(person);
person.name ="sai"
console.log(person)
person.age = 100
console.log(person)

person.isMajor = function(){
    return this.age>18
}
console.log(person.isMajor())
/*
var persons = []
persons.push( {name:"sai",age:50})
persons.push( {name:"sourabh",age:16})
console.log(persons)

function isMajor(p){
    return p.age > 18
}
var adults = persons.find(isMajor)
console.log(adults)
*/