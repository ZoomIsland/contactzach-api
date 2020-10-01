const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  name: String,
  email: String,
  howFind: String,
  message: String
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;