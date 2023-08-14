const connectToMongo = require('./db.js');
const express = require('express')
connectToMongo();

const server = express()
const port = 3000;

server.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})