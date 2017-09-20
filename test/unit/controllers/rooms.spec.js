const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const proxyquire = require('proxyquire').noCallThru();

const emitSpy = sinon.spy();
const ioFake = {
  in: () => ({
    emit: emitSpy
  })
};
const loggerFake = {
  error: sinon.spy()
};
const roomFake = {
  findAllByUser: sinon.stub()
};

const controller = proxyquire('../../../controllers/rooms/controller.js', {
  '../../infrastructure/socketio': ioFake,
  '../../infrastructure/logger': loggerFake,
  '../../models/room': roomFake
});

const { expect } = chai;
chai.use(sinonChai);

describe('/controller/rooms', () => {
  it('should join in the existing rooms', async () => {
    roomFake.findAllByUser.returns([{ _id: 123 }]);
    const next = sinon.spy();
    const socketFake = {
      handshake: {
        query: { userType: 'client', userId: '1' }
      },
      join: sinon.spy()
    };
    await controller.joinExistingRooms(socketFake, next);
    expect(socketFake.join).to.have.callCount(1);
    expect(socketFake.join).to.have.been.calledWith('123');
    expect(emitSpy).to.have.been.calledWithMatch('connected', [{ _id: 123 }]);
    expect(next).to.have.been.calledWith('success');
  });

  it('should failed to connect to the rooms', async () => {
    roomFake.findAllByUser.throws();
    const next = sinon.spy();
    const socketFake = {
      handshake: {
        query: { userType: 'client', userId: '1' }
      },
      join: sinon.spy()
    };
    await controller.joinExistingRooms(socketFake, next);
    expect(socketFake.join).to.have.callCount(0);
    expect(loggerFake.error).to.have.been.calledWithMatch(/User could not connect to the rooms/);
    expect(next).to.have.been.calledWithMatch(Error);
  });
});
