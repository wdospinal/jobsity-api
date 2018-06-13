const { db } = require('../firebase');
const { respondWithResult, respondWithError } = require('../helpers/response');
const { PATH_USER } = require('../helpers/constants');

// Get User id and booking
const getUserById = (id, res) =>
  db.doGetOne(PATH_USER, id, respondWithResult(res, 200));

// Get User limit 10
const getAllUsers = (limit, res) =>
  db.doGet(PATH_USER, parseInt(limit, 50), respondWithResult(res, 200));

// If id or not id
const getUser = (req, res) => {
  const { id, limit } = req.query;
  if (id) {
    getUserById(PATH_USER, id, res);
  } else {
    getAllUsers(PATH_USER, limit, res);
  }
};

// Create User
const postUser = (req, res) => {
  const {
    id,
    name,
    email,
    profile,
  } = req.body;
  // TODO: add validations to all data
  // Create a user in your own accessible Firebase Database too
  db.doCreate(
    PATH_USER,
    {
      id,
      name,
      email,
      profile,
    },
  )
    .then((solution) => {
      console.log('El envio fue correcto!', solution);
      respondWithResult(res, 200)(solution);
    })
    .catch((error) => {
      respondWithError(res, 500)(error);
    });
};

// Update User
const putUser = (req, res) => {
  const { id } = req.query;
  db.doPut(
    PATH_USER,
    id,
    req.query,
    respondWithResult(res, 200),
  );
};

// Delete User
const deleteUser = (req, res) => {
  const { id } = req.query;
  db.doDelete(id, respondWithResult(res, 200));
};

module.exports = {
  getUser, postUser, putUser, deleteUser,
};

