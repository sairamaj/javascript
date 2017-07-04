const express = require('express')
const app = express()
var bodyParser = require('body-parser')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/add', function(req,res){
  console.log('in add.')
  console.log(req.body)
  var num1 = Number(req.body.number1)
  var num2 = Number(req.body.number2)
  var result = num1 + num2
  res.send(String(result))
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})