const express = require('express')
require('dotenv').config()
const app = express()
require('./model/configDB')
const bodyParser = require('body-parser')
const router = require('./routes/main_router')


app.use(bodyParser.json())
app.use('/',router)

app.listen(7000,()=>{
  console.log('server run on port number 8000');
})

