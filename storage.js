// mock database
const R = require('ramda');

let nextId = 1;
const orders = {};

function add(order) {
  orders[nextId] = R.merge({ id: nextId }, order);
  nextId += 1;
}

function remove(id) {
  delete orders[id];
}

function list() {
  return orders;
}

module.exports = {
  add,
  remove,
  list,
};
