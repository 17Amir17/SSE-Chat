const express = require('express');
const cors = require('cors');
const path = require('path');
const loginRouter = require('./routers/loginRouter');
const messageRouter = require('./routers/messageRouter');
const errorHandler = require('./middleware/errorHandler/errorHandler');
const userRequest = require('./middleware/messageHandler');
const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Routers
app.use('/login', loginRouter);
app.use('/message', userRequest, messageRouter);
//Static folder and Default Routers
app.use(express.static(path.join(__dirname, '../client/build/')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
//Error handler
app.use(errorHandler);

module.exports = app;
