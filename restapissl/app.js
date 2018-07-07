var express = require('express')
var app = express()
var fs = require('fs')
var http = require('http');
var https = require('https')

var sslOptions = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
    passphrase : '1234'
  };

  app.get('/books', (req, res) => {
      
    res.json([
        {
            name : 'book1',
            price : 3.0
        },
        {
            name : 'book2',
            price : 5.0
        }        
    ])
})

// http.createServer(app).listen(3000)
https.createServer(sslOptions, app).listen(3443)