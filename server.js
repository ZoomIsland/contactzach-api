const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT;
const routes = require('./routes');

// MIDDLEWARE
// Body Parser
app.use(express.urlencoded({extended: false}));

// ROUTES
app.use('/api/v1/messages', routes.messages)

app.get('*', (req, res) => {
  res.send('<h1>404 Page Not Found</h1>')
})

// LISTENER
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`)
})