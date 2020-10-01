const db = require('./models/index');

db.Message.deleteMany({}, (err, deletedMessages) => {
  if (err) console.log(err);
  console.log(deletedMessages);
  process.exit();
})