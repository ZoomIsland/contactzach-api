const db = require('../models/index')
const nodemailer = require('nodemailer');
const { ENGINE_METHOD_RAND } = require('constants');

let transporter = nodemailer.createTransport({
  host: 'smtp.mail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.username,
    pass: process.env.password
  }
})

const index = (req, res) => {
  db.Message.find({}, (err, foundMessages) => {
    if (err) console.log('Error at Message Index:', err)
    res.status(200).json(foundMessages)
  })
}
  
const create = (req, res) => {
  let emailAddress;
  const re = /\S+@\S+\.\S+/;
  if (re.test(req.body.email)) {
    emailAddress = req.body.email
  } else {
    emailAddress = 'zachmilan@engineer.com';
  }

  const message = {
    from: "zachmilan@engineer.com",
    to: "zacherymilan@gmail.com",
    replyTo: emailAddress,
    subject: `New message from ${req.body.name}!`,
    text: `From ${req.body.name} at ${req.body.email}: ${req.body.message}`
  }
  transporter.sendMail(message)
  db.Message.create(req.body, (err, newMessage) => {
    if (err) console.log('Error at Message create:', err)
    res.status(200).json(newMessage)
  })
}

module.exports = {
  index,
  create
}