const { db } = require('../firebase');
const { respondWithResult, respondWithError } = require('../helpers/response');
const { PATH_MESSAGE } = require('../helpers/constants');
const { getStockPrice } = require('../stock/index');

// Get Message limit 10
const getAllMessages = (limit = 50, dni, callback) =>
  db.doGet(`${PATH_MESSAGE}/${dni}`, 'timestamp', parseInt(limit, 10), callback);

// If id or not id
const getMessage = (limit, dni, callback) => {
  getAllMessages(limit, dni, callback);
};

const createMessage = (idChat, dni, name, message, res) => {
  const timestamp = new Date().getTime();
  const msg = {
    dni,
    message,
    timestamp,
    name,
  };
  db.doCreateList(`${PATH_MESSAGE}/${idChat}`, msg)
    .then((solution) => {
      console.log('El envio fue correcto!', solution);
      respondWithResult(res, 200)(msg);
    })
    .catch((error) => {
      console.error(error);
      respondWithError(res, 500)(error);
    });
};

const postMessage = (req, res) => {
  const {
    dni,
    message,
    name,
  } = req.body;
  // TODO: add validations to all data
  // Create a user in your own accessible Firebase Database too
  const match = message.match(/[/+]stock=(.*)/i);
  const idChat = dni;
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
    createMessage(idChat, dni, name, message, res);
  }
};

// Update Message
const putMessage = (req, res) => {
  const {
    dni, id, name, message,
  } = req.body;
  db.doPut(PATH_MESSAGE, `${dni}/${id}`, { dni, name, message }, respondWithResult(res, 200));
};

// Delete Message
const deleteMessage = (req, res) => {
  const { id, dni } = req.query;
  db.doDelete(PATH_MESSAGE, `${dni}/${id}`, respondWithResult(res, 200));
};

module.exports = {
  getMessage, postMessage, putMessage, deleteMessage,
};

