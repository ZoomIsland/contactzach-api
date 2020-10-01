const db = require('../models/index')
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  // host: defaults to localhost, but needs to be the domain I get from heroku/netlify
  port: 465,
  secure: true,
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
  db.Message.create(req.body, (err, newMessage) => {
    if (err) console.log('Error at Message create:', err)
    res.status(200).json(newMessage)
  })
}

module.exports = {
  index,
  create
}