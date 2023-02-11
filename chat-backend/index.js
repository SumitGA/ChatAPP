const express = require('express')

const config = require('./config/app')

require('dotenv').config();

const app = express()

app.get('/home', (req, res) => {
  return res.send('Home Screen');
})

app.get('/login', (req, res) => {
  return res.send('Login Screen works now.');
})

const port = config.appPORT

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})