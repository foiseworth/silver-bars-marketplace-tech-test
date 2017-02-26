// mock database

let nextId = 0;
const orders = {};

function add(order) {
  orders[nextId] = { id: nextId, ...order };
  nextId += 1;
}

function remove(id) {
  delete orders[id];
}

function list() {
  return orders;
}

module.export = {
  add,
  remove,
  list,
};
