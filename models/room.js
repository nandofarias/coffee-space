const mongoose = require('mongoose');

async function findAllByUser(type, referenceId) {
  return this.find({ participants: { $elemMatch: { type, referenceId } } });
}

async function findOrCreate(participants) {
  try {
    if (!participants) throw new Error('Participants must be passed');
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

async function addMessage(sender, body) {
  const date = Date.now();
  const message = { sender, date, body };
  this.messages.push(message);
  return this.save();
}

const Room = new mongoose.Schema({
  messages: [{
    body: String,
    date: Date,
    sender: { type: { type: String }, referenceId: { type: String } }
  }],
  participants: [{ type: { type: String }, referenceId: { type: String } }],
  lastUpdate: Date
});

Room.statics.findAllByUser = findAllByUser;
Room.statics.findOrCreate = findOrCreate;
Room.methods.addMessage = addMessage;
Room.pre('save', (next) => {
  this.lastUpdate = Date.now();
  next();
});

module.exports = mongoose.model('Room', Room);
