const express = require('express')

const config = require('./config/app')

const router = require('./router')

const bodyParser = require('body-parser')

require('dotenv').config()

const cors = require('cors')

const app = express()

// To send form data
app.use(bodyParser.urlencoded({ extended: true }))

// To parse json object
app.use(bodyParser.json())
app.use(cors())
app.use(router)

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/uploads'))

const port = config.appPORT

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
