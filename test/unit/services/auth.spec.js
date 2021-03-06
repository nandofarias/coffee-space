const chai = require('chai');
const auth = require('../../../services/auth');

const { expect } = chai;

describe('/services/auth', () => {
  it('should authenticate a vendor', async () => {
    const user = await auth('vendor', 1);
    expect(user.id).to.equal(1);
    expect(user.name).to.equal('vendor 1');
  });

  it('should authenticate a client', async () => {
    const user = await auth('client', 1);
    expect(user.id).to.equal(1);
    expect(user.name).to.equal('client 1');
  });

  it('should throw an error calling a non configured method', async () => {
    try {
      await auth('error', 1);
    } catch (error) {
      expect(error.message).to.match(/Authentication method not configured/);
    }
  });
});
