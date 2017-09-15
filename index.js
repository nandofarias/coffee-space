const server = require('./infrastructure/server');
const port = parseInt(process.env.PORT, 10) || 3000;

require('./infrastructure/mongoose');
require('./infrastructure/socketio');
require('./controllers');

server.listen(port, () => console.log(`Server listing on port: ${port}`));
