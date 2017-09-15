async function vendorAuth(vendorId) {
  return { id: 1, name: 'vendor 1' };
}

async function clientAuth(clientId) {
  return { id: 1, name: 'client 1' };
}

async function auth(type, id) {
  return auth.operationsByType[type](id);
}

auth.operationsByType = {
  'CLIENT': clientAuth,
  'VENDOR': vendorAuth
}

module.exports = auth;
