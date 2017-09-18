const mongoose = require('mongoose');
const bluebird = require('bluebird');
const logger = require('./logger');

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/coffee_space';

mongoose.Promise = bluebird;

mongoose.connection.on('connected', () => {
  logger.info(`Mongoose default connection open to ${uri}`);
});

mongoose.connection.on('error', (err) => {
  logger.info(`Mongoose default connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose default connection disconnected');
});

const db = mongoose.connect(uri, {
  useMongoClient: true
});

module.exports = db;
