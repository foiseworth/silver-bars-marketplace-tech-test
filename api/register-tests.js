/* eslint-env mocha */
const sinon = require('sinon');
const register = require('./register');
const expect = require('code').expect;

describe('Register api', () => {
  let resStub;
  let reqStub;
  let storageStub;
  let order;

  beforeEach(() => {
    order = {
      userId: '123',
      orderQuantity: 456,
      pricePerKg: 789,
      orderType: 'BUY',
    };

    resStub = {
      send: sinon.stub(),
      status: sinon.stub(),
    };
    resStub.send.returns(resStub);
    resStub.status.returns(resStub);

    reqStub = {
      body: order,
    };

    storageStub = {
      add: sinon.stub(),
    };
  });

  context('when the request does not have a user id', () => {
    beforeEach(() => {
      delete reqStub.body.userId;
      register(storageStub, reqStub, resStub);
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

  context('when the request does not have a order quantity', () => {
    beforeEach(() => {
      delete reqStub.body.orderQuantity;
      register(storageStub, reqStub, resStub);
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

  context('when the request does not have a price per kg', () => {
    beforeEach(() => {
      delete reqStub.body.pricePerKg;
      register(storageStub, reqStub, resStub);
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

  context('when the request does not have a order type', () => {
    beforeEach(() => {
      delete reqStub.body.orderType;
      register(storageStub, reqStub, resStub);
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

  context('when the request does not have an order type of Buy or Sell', () => {
    beforeEach(() => {
      reqStub.body.orderType = 'foo';
      register(storageStub, reqStub, resStub);
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

  context('when the request has an order type of BUY', () => {
    beforeEach(() => {
      register(storageStub, reqStub, resStub);
    });

    it('should send a 200 status code', () => {
      expect(resStub.status.calledOnce).to.be.true();
      expect(resStub.status.calledWithExactly(200)).to.be.true();
    });

    it('should send a api success', () => {
      expect(resStub.send.calledOnce).to.be.true();
      expect(resStub.send.calledWithExactly({ status: 'success' })).to.be.true();
    });

    it('should persist the order', () => {
      expect(storageStub.add.calledOnce).to.be.true();
      expect(storageStub.add.calledWithExactly(order)).to.be.true();
    });
  });

  context('when the request has an order type of SELL', () => {
    beforeEach(() => {
      reqStub.body.orderType = 'SELL';
      register(storageStub, reqStub, resStub);
    });

    it('should send a 200 status code', () => {
      expect(resStub.status.calledOnce).to.be.true();
      expect(resStub.status.calledWithExactly(200)).to.be.true();
    });

    it('should send a api success', () => {
      expect(resStub.send.calledOnce).to.be.true();
      expect(resStub.send.calledWithExactly({ status: 'success' })).to.be.true();
    });

    it('should persist the order', () => {
      expect(storageStub.add.calledOnce).to.be.true();
      expect(storageStub.add.calledWithExactly(order)).to.be.true();
    });
  });
});
