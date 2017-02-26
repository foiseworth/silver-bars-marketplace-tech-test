const sinon = require('sinon');

function createReqStub(body) {
  return {
    body,
  };
}

function createResStub() {
  const stub = {
    send: sinon.stub(),
    status: sinon.stub(),
  };
  stub.send.returns(stub);
  stub.status.returns(stub);

  return stub;
}

function createStorageStub(currentItems) {
  return {
    add: sinon.stub(),
    remove: sinon.stub(),
    list: sinon.stub().returns(currentItems),
  };
}

module.exports = {
  createResStub,
  createReqStub,
  createStorageStub,
};
