const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const Room = require('../../../models/room.js');

const { expect } = chai;
chai.use(sinonChai);


describe('/models/room', async () => {
  it('should return all rooms by user logged in', async () => {
    const findStub = sinon.stub(Room, 'find');
    findStub.returns([]);
    const rooms = await Room.findAllByUser();
    expect(rooms).to.eql([]);
  });

  it('should find a room', async () => {
    const findOneStub = sinon.stub(Room, 'findOne');
    findOneStub.returns({ id: 1, messages: [] });
    const room = await Room.findByParticipants([]);
    expect(room.id).to.eql(1);
    expect(room.messages).to.eql([]);
    findOneStub.restore();
  });

  it('should add a message to the room', async () => {
    const saveStub = sinon.stub(Room.prototype, 'save');
    const room = new Room();
    await room.addMessage({ type: 'userTest', referenceId: '1' }, 'test');
    expect(room.messages[0].body).to.be.eql('test');
    expect(saveStub).to.have.callCount(1);
    saveStub.restore();
  });
});

