/* eslint-env mocha */
const summary = require('./summary');
const { expect } = require('code');
const R = require('ramda');
const { createReqStub, createResStub, createStorageStub } = require('../test-helpers');

describe('Summary api', () => {
  let resStub;
  let reqStub;

  beforeEach(() => {
    resStub = createResStub();
    reqStub = createReqStub();
  });

  context('when a storage object is not passed to the route creator', () => {
    it('should thrown an error', () => {
      expect(summary).to.throw();
    });
  });

  context('when the list is empty', () => {
    beforeEach(() => {
      summary(createStorageStub([]))(reqStub, resStub);
    });

    it('should send a 200 status code', () => {
      expect(resStub.status.calledOnce).to.be.true();
      expect(resStub.status.calledWithExactly(200)).to.be.true();
    });

    it('should send an api success', () => {
      expect(resStub.send.calledOnce).to.be.true();
      expect(resStub.send.calledWithExactly({ status: 'success', data: { buy: [], sell: [] } })).to.be.true();
    });
  });

  context('when the list has orders', () => {
    let resData;
    let orders;
    const getOrderIds = R.pluck('ids');
    const getOrderIdsFlattened = R.pipe(getOrderIds, R.unnest);

    beforeEach(() => {
      orders = {
        1: { id: 1, userId: '123', orderQuantity: 21, pricePerKg: 500, orderType: 'BUY' },
        21: { id: 21, userId: '124', orderQuantity: 12, pricePerKg: 500, orderType: 'BUY' },
        22: { id: 22, userId: '124', orderQuantity: 19, pricePerKg: 500, orderType: 'BUY' },
        3: { id: 3, userId: '125', orderQuantity: 33, pricePerKg: 234, orderType: 'BUY' },
        43: { id: 43, userId: '126', orderQuantity: 56, pricePerKg: 671, orderType: 'BUY' },
        5: { id: 5, userId: '123', orderQuantity: 32, pricePerKg: 222, orderType: 'BUY' },
        6: { id: 6, userId: '124', orderQuantity: 34, pricePerKg: 967, orderType: 'SELL' },
        71: { id: 71, userId: '125', orderQuantity: 17, pricePerKg: 967, orderType: 'SELL' },
        8: { id: 8, userId: '126', orderQuantity: 19, pricePerKg: 500, orderType: 'SELL' },
        93: { id: 93, userId: '127', orderQuantity: 15, pricePerKg: 850, orderType: 'SELL' },
        10: { id: 10, userId: '128', orderQuantity: 9, pricePerKg: 999, orderType: 'SELL' },
      };
      summary(createStorageStub(orders))(reqStub, resStub);
      resData = resStub.send.lastCall.args[0].data;
    });

    it('should send a 200 status code', () => {
      expect(resStub.status.calledOnce).to.be.true();
      expect(resStub.status.calledWithExactly(200)).to.be.true();
    });

    it('should send a api success', () => {
      expect(resStub.send.calledOnce).to.be.true();
      expect(resStub.send.lastCall.args[0].status).to.equal('success');
    });

    it('transforms orders into summaries', () => {
      summary(createStorageStub({ 3: orders[3] }))(reqStub, resStub);
      resData = resStub.send.lastCall.args[0].data;

      expect(resData.buy[0]).to.equal({
        ids: [3],
        userIds: ['125'],
        orderQuantity: 33,
        pricePerKg: 234,
        orderType: 'BUY',
      });
    });

    it('combines orders with the same pricePerKg', () => {
      expect(resData.buy[1]).to.equal({
        ids: [1, 21, 22],
        userIds: ['123', '124'],
        orderQuantity: 52,
        pricePerKg: 500,
        orderType: 'BUY',
      });
    });

    it('filters the orders into the correct buy/sell lists', () => {
      expect(getOrderIdsFlattened(resData.buy)).to.include([1, 21, 3, 43, 5]);
      expect(getOrderIdsFlattened(resData.sell)).to.include([6, 71, 8, 93, 10]);
    });

    it('sorts BUY orders by the highest price first', () => {
      expect(getOrderIds(resData.buy)).to.include([[43], [1, 21, 22], [3], [5]]);
    });

    it('sorts SELL orders by the highest price first', () => {
      expect(getOrderIds(resData.sell)).to.include([[8], [93], [6, 71], [10]]);
    });
  });
});
