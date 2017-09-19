# Coffee Space
Open-source chat implementation using socket.io

## Client Example
```js
const io = require('socket.io-client');
const socket = io('http://localhost:3000?userType=VENDOR&userId=1');
socket.emit('new_chat', { destination: { userType:'CLIENT', userId: '1' }});
socket.on('chat_created', (room) => {
  socket.emit('send_message', { to: room._id, message: 'test' });
});
```

## Docker Compose
```bash
docker-compose build
docker-compose up -d
```

## Docker Swarm
```bash
docker network create --driver overlay coffeespace_network
docker service create --name mongodb --network=coffeespace_network mongo
docker service create --name redis --network=coffeespace_network redis:alpine
docker service create --name app --network=coffeespace_network --publish 3000:3000 coffeespace_node
```