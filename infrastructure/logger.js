const winston = require('winston');

const logger = new winston.Logger({
  // transports: [
  //   new winston.transports.File({ filename: 'tmp/coffee-space/all-logs.log' })
  // ],
  // exceptionHandlers: [
  //   new winston.transports.File({ filename: 'tmp/coffee-space/exceptions.log' })
  // ]
  transports: [
    new (winston.transports.Console)({ colorize: true })
  ],
  level: 'debug'
});


module.exports = logger;
