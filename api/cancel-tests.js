/* eslint-env mocha */
const cancel = require('./cancel');
const { expect } = require('code');
const { createReqStub, createResStub, createStorageStub } = require('../test-helpers');

describe('Cancel api', () => {
  let resStub;
  let reqStub;
  let storageStub;
  let order;

  beforeEach(() => {
    order = {
      id: '123',
    };

    resStub = createResStub();
    reqStub = createReqStub(order);
    storageStub = createStorageStub();
  });

  context('when a storage object is not passed to the route creator', () => {
    it('should thrown an error', () => {
      expect(cancel).to.throw();
    });
  });

  context('when the request does not have an order id', () => {
    beforeEach(() => {
      delete reqStub.body.id;
      cancel(storageStub)(reqStub, resStub);
    });

    it('should send a 403 status code', () => {
      expect(resStub.status.calledOnce).to.be.true();
      expect(resStub.status.calledWithExactly(403)).to.be.true();
    });

    it('should send a api error', () => {
      expect(resStub.send.calledOnce).to.be.true();
      expect(resStub.send.calledWithExactly({ status: 'error' })).to.be.true();
    });
  });

  context('when the request has an order id', () => {
    beforeEach(() => {
      cancel(storageStub)(reqStub, resStub);
    });

    it('should send a 200 status code', () => {
      expect(resStub.status.calledOnce).to.be.true();
      expect(resStub.status.calledWithExactly(200)).to.be.true();
    });

    it('should send a api success', () => {
      expect(resStub.send.calledOnce).to.be.true();
      expect(resStub.send.calledWithExactly({ status: 'success' })).to.be.true();
    });

    it('should remove the order', () => {
      expect(storageStub.remove.calledOnce).to.be.true();
      expect(storageStub.remove.calledWithExactly(order.id)).to.be.true();
    });
  });
});
