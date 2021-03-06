const mongoose = require('mongoose');
const { Mongo } = require('../../environment');
const dbURI = `mongodb://${Mongo.HOST}:${Mongo.PORT}/${Mongo.NAME}`;
const db = mongoose.createConnection(dbURI, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to ', dbURI);
});

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error: ', err);
  process.exit(1);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const gracefulShutdown = function(msg, callback) {
  mongoose.disconnect(() => {
    console.log('Mongoose disconnected through ', msg);
    callback();
  });
}

process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

module.exports = db;
