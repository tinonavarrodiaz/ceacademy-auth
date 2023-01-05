const mongoose = require('mongoose');
const connOBJ = require('./conn.config');

mongoose.set('strictQuery', false);
const mongodb = connOBJ.mongodb;

const conn = mongoose
  .connect(`mongodb://${mongodb.host}:${mongodb.port}/${mongodb.database}`)
  .then((db) => {
    console.log('connection successful');
  })
  .catch((err) => {
    console.log('error:', err);
  });

module.exports = conn;
