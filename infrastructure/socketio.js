const server = require('./server');
const socketio = require('socket.io');
const redis = require('socket.io-redis');
const io = socketio(server);

const uri = process.env.REDIS_URI || 'redis://localhost:6379';
const redisAdapter = redis(uri);

io.adapter(redisAdapter);


module.exports = io;
