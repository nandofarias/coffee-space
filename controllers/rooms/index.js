const io = require('../../infrastructure/socketio');
const controller = require('./controller');

io.use(controller.joinExistingRooms);

io.on('connect', (socket) => {
  socket.on('send_message', controller.sendMessage.bind(undefined, socket));
  socket.on('new_chat', controller.createRoom.bind(undefined, socket));
});
