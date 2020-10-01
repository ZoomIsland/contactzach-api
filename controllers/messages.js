const db = require('../models/index')
const nodemailer = require('nodemailer');

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
  // test email address?
  // if not real, send a 400 (Bad Request)

  const message = {
    from: "zachmilan@engineer.com",
    to: "zacherymilan@gmail.com",
    replyTo: req.body.email,
    subject: `New message from ${req.body.name}!`,
    text: req.body.message
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