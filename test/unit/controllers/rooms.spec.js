const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const proxyquire = require('proxyquire').noCallThru();

const authStub = sinon.stub();
const controller = proxyquire('../../../controllers/rooms/controller.js', {
  auth: authStub
});

const { expect } = chai;
chai.use(sinonChai);

describe('/controller/rooms', () => {
  it('should join in the existing rooms', async () => {

  });
});
