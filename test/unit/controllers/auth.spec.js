const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const proxyquire = require('proxyquire').noCallThru();

const authStub = sinon.stub();
const controller = proxyquire('../../../controllers/auth/controller.js', {
  '../../services/auth': authStub
});

const { expect } = chai;
chai.use(sinonChai);

describe('/controllers/auth', () => {
  it('should authenticate a new connection', async () => {
    authStub.returns({ id: 1, name: 'teste' });
    const next = sinon.spy();
    const socketFake = {
      handshake: {
        query: { userType: 'client', userId: '1' }
      }
    };
    await controller.authenticate(socketFake, next);
    expect(next).to.have.been.calledWith('success');
  });

  it('should throw an error when not found the user', async () => {
    authStub.returns(null);
    const next = sinon.spy();
    const socketFake = {
      handshake: {
        query: { userType: 'client', userId: '1' }
      }
    };
    await controller.authenticate(socketFake, next);
    expect(next).to.have.been.calledWithMatch(Error);
  });

  it('should throw an error when connection fail', async () => {
    authStub.throws(new Error('connection not available'));
    const next = sinon.spy();
    const socketFake = {
      handshake: {
        query: { userType: 'client', userId: '1' }
      }
    };
    await controller.authenticate(socketFake, next);
    expect(next).to.have.been.calledWithMatch(Error);
  });
});
