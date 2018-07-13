var express = require('express')
var app = express()

app.use(function(req, res, next) {
    // Put some preprocessing here.
    console.log('before first request.')
    console.log('in first url:' + req.url)
    var parts = req.url.split('/')
    console.log('parts are:' + parts.length)
    req.url = '/' + parts[1]
    console.log('in first after split:' + req.url)
    next();
  });

app.get('/test', (req,res)=>{
    console.log('in test url:' + req.url)
    return res.send([
        {
            name : "name1"
        },
        {
            name : "name2"
        }
    ])
})
console.log('listening at 3000...')
app.listen(3000)
