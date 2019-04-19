const stats = require('./stats');

const add = (cart, req) => {
  cart.contents.push(req.body);
  stats.addAction('add', req.body.id_product);
  return JSON.stringify(cart, null, 4);
};

const change = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  find.quantity += req.body.quantity;
  if (req.body.quantity > 0) {
    stats.addAction('add', +req.params.id);
  } else {
    stats.addAction('del', +req.params.id);
  }
  return JSON.stringify(cart, null, 4);
};

const del = (cart, req) => {
  cart.contents.splice(cart.contents.indexOf(el => el.id_product === +req.params.id), 1);
  stats.addAction('del', +req.params.id);
  return JSON.stringify(cart, null, 4);
};

module.exports = {
  add,
  change,
  del,
};