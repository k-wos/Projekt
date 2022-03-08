const express = require('express') 
const app = express() 
app.get('/operation','/num1','/num2', function (req, res) { res.send('Hello World') }) 

app.listen(3000)