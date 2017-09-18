const server = require('./infrastructure/server');
const logger = require('./infrastructure/logger');

const port = parseInt(process.env.PORT, 10) || 3000;

require('./infrastructure/mongoose');
require('./infrastructure/socketio');
require('./controllers');

server.listen(port, () => logger.info(`Server listing on port: ${port}`));
