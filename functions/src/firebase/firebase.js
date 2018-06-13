const functions = require('firebase-functions');
const admin = require('firebase-admin');

const { firebase } = functions.config();
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebase.databaseURL,
});

const database = admin.database();

module.exports = {
  database,
};
