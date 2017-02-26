const R = require('ramda');
const { API_SUCCESS } = require('../constants');

function createApiResponse(buyOrders = [], sellOrders = []) {
  return R.merge({ data: { buy: buyOrders, sell: sellOrders } }, API_SUCCESS);
}

const transfromToSummaryOrders = R.map(order => R.merge({
  ids: [order.id],
  userIds: [order.userId]
}, R.omit(['id', 'userId'], order)));

const groupByOrderType = R.pipe(
  R.values,
  R.groupBy(R.prop('orderType'))
);

const combineOrders = (k, l, r) => R.cond([
  [R.equals('ids'), () => R.concat(l, r)],
  [R.equals('userIds'), () => R.union(l, r)],
  [R.equals('orderQuantity'), () => R.sum([l, r])],
  [R.T, R.always(l)],
])(k);

const mergeOrdersWithSamePrice = R.pipe(
  R.groupBy(R.prop('pricePerKg')),
  R.map(R.reduce(R.mergeWithKey(combineOrders), [])),
  R.values
);

const highestPriceFirst = R.descend(R.prop('pricePerKg'));
const lowestPriceFirst = R.ascend(R.prop('pricePerKg'));

const groupAndSortOrders = R.pipe(
  transfromToSummaryOrders,
  groupByOrderType,
  R.map(mergeOrdersWithSamePrice),
  R.evolve({
    BUY: R.sort(highestPriceFirst),
    SELL: R.sort(lowestPriceFirst),
  })
);

function summary(storage) {
  if (!storage) throw new Error('Summary route requires storage to list orders');

  return function summaryRoute(req, res) {
    const orders = storage.list();

    const { BUY, SELL } = groupAndSortOrders(orders);

    res.status(200).send(createApiResponse(BUY, SELL));
  };
}


module.exports = summary;
