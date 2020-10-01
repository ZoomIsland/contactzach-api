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
  const message = {
    from: "zachmilan@engineer.com",
    to: "zacherymilan@gmail.com",
    subject: "New message from your portfolio!",
    text: "This is a test, only that."
  }
  transporter.sendMail(message, (err) => {
    console.log(err)
  })
  db.Message.create(req.body, (err, newMessage) => {
    if (err) console.log('Error at Message create:', err)
    res.status(200).json(newMessage)
  })
}

module.exports = {
  index,
  create
}