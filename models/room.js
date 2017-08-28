const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Room = new Schema({
  name: String,
  messages: [{ body: String, date: Date, sender: String }],
  participants: Array
})


module.exports = mongoose.model('Room', Room);