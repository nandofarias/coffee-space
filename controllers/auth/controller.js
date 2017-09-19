const auth = require('../../services/auth');

async function authenticate(socket, next) {
  try {
    const params = socket.handshake.query;
    const userReference = await auth(params.userType, params.userId);
    if (!userReference) {
      next(new Error('User not found'));
    }
    next('success');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authenticate
};
