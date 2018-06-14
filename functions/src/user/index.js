const { db } = require('../firebase');
const { respondWithResult, respondWithError } = require('../helpers/response');
const { PATH_USER } = require('../helpers/constants');


const updateUser = (req, res) => {
  const {
    dni, name, email, profile,
  } = req.body;
  db.doPut(PATH_USER, dni, {
    dni, name, email, profile,
  }, respondWithResult(res, 200));
};

const getUser = (req, res) => {
  const { dni } = req.query;
  db.doGetOne(PATH_USER, dni, respondWithResult(res, 200));
};

const deleteUser = (req, res) => {
  const { dni } = req.query;
  db.doDelete(PATH_USER, dni, respondWithResult(res, 200));
};

const postUser = (req, res) => {
  const {
    dni,
    name,
    email,
    profile,
  } = req.body;

  const user = {
    dni,
    name,
    email,
    profile,
  };
  db.doCreate(PATH_USER, dni, user)
    .then((solution) => {
      console.log('El envio fue correcto!', solution);
      respondWithResult(res, 200)(solution);
    })
    .catch((error) => {
      respondWithError(res, 500)(error);
    });
};

module.exports = {
  getUser, postUser, updateUser, deleteUser,
};

