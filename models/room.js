const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Room = new Schema({
  messages: [{
    body: String,
    date: Date,
    sender: { type: { type: String }, referenceId: { type: String } }
  }],
  participants: [{ type: { type: String }, referenceId: { type: String } }],
  lastUpdate: Date
});

Room.statics.findAllByUser = async function (type, referenceId) {
  return this.find({ participants: { $elemMatch:  { type, referenceId } } });
};

Room.statics.findOrCreate = async function (participants) {
  try {
    let room = await this.findOne({
      participants: {
        $all: participants.map(participant => ({ $elemMatch: participant }))
      }
    });
    if (!room) {
      try {
        room = await new this({ participants }).save();
      } catch (error) {
        throw error;
      }
    }
    return room;
  } catch (error) {
    throw error;
  }
}

Room.methods.addMessage = async function (sender, body) {
  const date = Date.now();
  const message = { sender, date, body };
  this.messages.push(message);
  return this.save();
};

Room.pre('save', function(next, done) {
  this.lastUpdate = Date.now();
  next();
});
module.exports = mongoose.model('Room', Room);
