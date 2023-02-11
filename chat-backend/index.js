const express = require('express')

const config = require('./config/app')

const router = require('./router')

require('dotenv').config();

const app = express()

app.use(router);

const port = config.appPORT

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})