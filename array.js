var patterns = [
    { name: "singleton", description: 'This is singleton pattern' },
    { name: "builder", description: 'This is builder pattern' },
    { name: "adapter", description: 'This is adapter pattern' },
    { name: "iterator", description: 'This is iterator pattern' }
]

function getPattern(name){
    return patterns.find( function(p){
        if( p.name == name)
        {
            return true;
        }
    })
}

console.log(getPattern("singleton").description)

