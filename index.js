const server = require('./infrastructure/server');
const port = parseInt(process.env.PORT, 10) || 3000;

require('./infrastructure/mongoose');
require('./controllers/rooms');

server.listen(port);
