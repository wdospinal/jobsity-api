const { database } = require('./firebase');

const doCreate = (path, id, object) =>
  database.ref(`${path}${id}`).set(object);

const doCreateList = (path, object) =>
  database.ref(`${path}`).push().set(object);

const doGetOne = (path, id, callback) =>
  database.ref(`${path}${id}`).on('value', callback);

const doPut = (path, id, field, callback) => {
  database.ref(`${path}${id}`).update(field, callback);
};

const doDelete = (path, id, callback) => {
  database.ref(`${path}${id}`).remove(callback);
};

const doGet = (path, orderBy, limit, callback) =>
  database.ref(path).orderByKey().limitToLast(limit).on('value', callback);

module.exports = {
  doCreate, doCreateList, doGetOne, doGet, doPut, doDelete,
};
