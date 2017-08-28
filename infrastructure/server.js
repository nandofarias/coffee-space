const app = require('./express');
const http = require('http');
const server = http.Server(app);

module.exports = server;
