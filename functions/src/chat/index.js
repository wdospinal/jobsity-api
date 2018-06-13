const { respondWithResult } = require('../helpers/response');
const { getMessage } = require('../message/index');

// If id or not id
const getChat = (req, res) => {
  const { limit, idUser } = req.query;
  getMessage(limit, idUser, respondWithResult(res, 200));
};

module.exports = {
  getChat,
};

