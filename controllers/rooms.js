const app = require('../infrastructure/express');
const io = require('../infrastructure/socketio');
const Room = require('../models/room');

app.get('/rooms/:name', async (req, res, next) => {
  try {
    const room = await Room.findOne({ name: req.params.name });
    res.json(room);
  } catch(e) {
    next(e);
  }
});

app.post('/rooms', async (req, res, next) => {
  try {
    const room = new Room(req.body);
    const newRoom = await room.save();
    res.status(200).send(newRoom);
  } catch(e) {
    next(e);
  }
});

io.on('connect', (socket) => {
  socket.on('join room', (room) => {
    socket.join(room);
  });

  socket.on('new message', async (data) => {
    try {
      const room = await Room.findById(data.room);
      room.messages.push(data);
      await room.save();
      io.in(data.room).emit('message created', data.body);
    } catch(e) {
      io.in(data.room).emit('message error', e);
    }
  });
});

