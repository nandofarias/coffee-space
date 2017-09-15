const io = require('../../infrastructure/socketio');
const logger = require('../../infrastructure/logger');
const controller = require('./controller');
const Room = require('../../models/room');

io.use(controller.joinExistingRooms);

io.on('connect', (socket) => {
  socket.on('send_message', controller.sendMessage.bind(undefined, socket));
  socket.on('new_chat', controller.createRoom.bind(undefined, socket));
});
