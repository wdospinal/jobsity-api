const functions = require('firebase-functions');
const db = require('./src/firebase/firebase');
const {
  getUser, postUser, deleteUser, updateUser,
} = require('./src/users');
const {
  postMessage, putMessage, deleteMessage,
} = require('./src/message');
const {
  getChat,
} = require('./src/chat');

exports.user = functions.https.onRequest((req, res) => {
  switch (req.method) {
    case 'GET':
      console.log(req.query);
      getUser(req, res);
      break;
    case 'POST':
      console.log(req.body);
      postUser(req, res);
      break;
    case 'DELETE':
      deleteUser(req, res);
      break;
    case 'PUT':
      console.log(req.body);
      updateUser(req, res);
      break;
    default:
      console.log('error', req);
  }
});

exports.messages = functions.https.onRequest((req, res) => {
  switch (req.method) {
    case 'POST':
      console.log(req.body);
      postMessage(req, res);
      break;
    case 'PUT':
      console.log(req.query);
      putMessage(req, res);
      break;
    case 'DELETE':
      console.log(req.query);
      deleteMessage(req, res);
      break;
    default:
      console.log('error', req);
  }
});

exports.chat = functions.https.onRequest((req, res) => {
  switch (req.method) {
    case 'GET':
      console.log(req.query);
      getChat(req, res);
      break;
    default:
      console.log('error', req);
  }
});
