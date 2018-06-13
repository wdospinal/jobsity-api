const { db } = require('../firebase');
const { respondWithResult, respondWithError } = require('../helpers/response');
const { PATH_MESSAGE } = require('../helpers/constants');
const { getStockPrice } = require('../stock/index');

// Get Message limit 10
const getAllMessages = (limit = 50, idUser, callback) =>
  db.doGet(`${PATH_MESSAGE}/${idUser}`, 'timestamp', parseInt(limit, 10), callback);

// If id or not id
const getMessage = (limit, idUser, callback) => {
  getAllMessages(limit, idUser, callback);
};

const createMessage = (idChat, idUser, name, message, res) => {
  const timestamp = new Date().getTime();
  db.doCreateList(
    `${PATH_MESSAGE}/${idChat}`,
    {
      idUser,
      message,
      timestamp,
      name,
    },
  )
    .then((solution) => {
      console.log('El envio fue correcto!', solution);
      respondWithResult(res, 200)(solution);
    })
    .catch((error) => {
      console.error(error);
      respondWithError(res, 500)(error);
    });
};

const postMessage = (req, res) => {
  const {
    idUser,
    message,
    name,
  } = req.body;
  // TODO: add validations to all data
  // Create a user in your own accessible Firebase Database too
  const match = message.match(/[/+]stock=(.*)/i);
  const idChat = idUser;
  if (match) {
    const stock = match[1];
    getStockPrice(stock)
      .then((result) => {
        const idBot = 1;
        const botName = 'jobsity';
        const newMsg = `${stock} quote is $${result.Close} per share`;
        createMessage(idChat, idBot, botName, newMsg, res);
      })
      .catch((error) => {
        console.error(error);
        respondWithError(res, 500)(error);
      });
  } else {
    createMessage(idChat, idUser, name, message, res);
  }
};

// Update Message
const putMessage = (req, res) => {
  const { id } = req.query;
  db.doPut(
    PATH_MESSAGE,
    id,
    ...req.query,
    respondWithResult(res, 200),
  );
};

// Delete Message
const deleteMessage = (req, res) => {
  const { id } = req.query;
  db.doDelete(id, respondWithResult(res, 200));
};

module.exports = {
  getMessage, postMessage, putMessage, deleteMessage,
};

