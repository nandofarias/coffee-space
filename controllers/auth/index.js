const io = require('../../infrastructure/socketio');
const controller = require('./controller');

io.use(controller.authenticate);
