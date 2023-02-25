const express = require('express')
const config = require('./config/app')
const router = require('./router')
const bodyParser = require('body-parser')
const http = require('http')
const cors = require('cors')
const app = express()

// To send form data
app.use(bodyParser.urlencoded({ extended: true }))
const server = http.createServer(app)
const SocketServer = require('./socket')
SocketServer(server)

// To parse json object
app.use(bodyParser.json())
app.use(cors())
app.use(router)

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/uploads'))

const port = config.appPORT

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
