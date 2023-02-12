const express = require('express')

const config = require('./config/app')

const router = require('./router')

const bodyParser = require('body-parser')

require('dotenv').config();

const app = express()

// To send form data
app.use(bodyParser.urlencoded({extended: true}))

// To parse json object
app.use(bodyParser.json())

app.use(router);

const port = config.appPORT

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})