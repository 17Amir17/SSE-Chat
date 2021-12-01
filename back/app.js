const express = require('express');
const cors = require('cors');
const loginRouter = require('./routers/loginRouter');
const messageRouter = require('./routers/messageRouter');
const errorHandler = require('./middleware/errorHandler/errorHandler');
const userRequest = require('./middleware/messageHandler');
const app = express();

//Middleware
app.use(cors());
//Routers
app.use('/login', loginRouter);
app.use('/message', messageRouter, userRequest); //
app.use(errorHandler);

module.exports = app;
