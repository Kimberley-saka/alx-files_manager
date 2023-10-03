/* eslint-disable linebreak-style */
const express = require('express');
const routes = require('./routes');

const server = express();

const port = process.env.PORT || 5000;

server.use('/', routes);
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
