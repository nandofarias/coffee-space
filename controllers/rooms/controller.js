const io = require('../../infrastructure/socketio');
const logger = require('../../infrastructure/logger');
const Room = require('../../models/room');

async function joinExistingRooms(socket, next) {
  try {
    const params = socket.handshake.query;
    const rooms = await Room.findAllByUser(params.userType, params.userId);
    rooms.forEach(room => socket.join(room._id.toString()));
    io.in(socket.id).emit('connected', rooms);
    next();
  } catch (error) {
    logger.error(`User could not connect to the rooms: ${error}`, socket.user);
    next(error);
  }
}

async function sendMessage(socket, data) {
  try {
    const params = socket.handshake.query;
    const sender = { type: params.userType, referenceId: params.userId };
    const room = await Room.findOne({ _id: data.to });
    if (!room) {
      io.in(socket).emit('client_error', { message: 'Room not found' });
    }
    await room.addMessage(sender, data.message);
    io.in(data.roomId).emit('message_sended', data.message);
  } catch (error) {
    logger.error(`Could not perform a send_message operation: ${error}`);
    io.in(socket).emit('server_error', { message: error.message });
  }
}

async function createRoom(socket, data) {
  try {
    const params = socket.handshake.query;
    const user = { type: params.userType, referenceId: params.userId };
    const destination = {
      type: data.destination.userType,
      referenceId: data.destination.userId
    };
    const room = new Room({ participants: [user, destination] });
    await room.save();
    socket.join(room._id.toString());
    io.in(room._id.toString()).emit('chat_created', room);
  } catch (error) {
    logger.error(`Could not perform a new_chat operation: ${error}`);
    io.in(socket).emit('server_error', { message: error.message });
  }
}


module.exports = {
  joinExistingRooms,
  sendMessage,
  createRoom
};
