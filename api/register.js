const R = require('ramda');
const { ORDER_TYPES, API_ERROR, API_SUCCESS } = require('../constants');

const registerValidator = R.where({
  userId: R.is(String),
  orderQuantity: R.is(Number),
  pricePerKg: R.is(Number),
  orderType: R.either(R.equals(ORDER_TYPES.BUY), R.equals(ORDER_TYPES.SELL)),
});

function register(storage) {
  if (!storage) throw new Error('Register route requires storage to persist orders');

  return function registerRoute(req, res) {
    const registerData = R.pick(['userId', 'orderQuantity', 'pricePerKg', 'orderType'], req.body);
    if (!registerValidator(registerData)) {
      res.status(400).send(API_ERROR);
      return;
    }

    storage.add(registerData);
    res.status(200).send(API_SUCCESS);
  };
}

module.exports = register;
