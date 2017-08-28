const mongoose = require('mongoose');
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/coffee_space';
const bluebird = require('bluebird');

mongoose.Promise = bluebird;

mongoose.connection.on('connected', () => {  
  console.log('Mongoose default connection open to ' + uri);
}); 

mongoose.connection.on('error', err => {  
  console.log('Mongoose default connection error: ' + err);
}); 

mongoose.connection.on('disconnected', () => {  
  console.log('Mongoose default connection disconnected'); 
});

const db = mongoose.connect(uri, {
  useMongoClient: true
});

module.exports = db;
