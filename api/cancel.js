const R = require('ramda');
const { API_ERROR, API_SUCCESS } = require('../constants');

function cancel(storage) {
  if (!storage) throw new Error('Cancel route requires storage to remove orders');

  return function cancelRoute(req, res) {
    const orderId = req.body.id;

    if (!R.is(String, orderId)) {
      res.status(400).send(API_ERROR);
      return;
    }

    storage.remove(orderId);
    res.status(200).send(API_SUCCESS);
  };
}


module.exports = cancel;
