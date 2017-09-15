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
