async function vendorAuth() {
  return { id: 1, name: 'vendor 1' };
}

async function clientAuth() {
  return { id: 1, name: 'client 1' };
}

async function auth(type, id) {
  return auth.operationsByType[type.toLowerCase()](id);
}

auth.operationsByType = {
  client: clientAuth,
  vendor: vendorAuth
};

module.exports = auth;
