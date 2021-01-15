const admin = require('firebase-admin');
const config = require('config');

const serviceAccount = config.get('firestoreKey');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { db };
