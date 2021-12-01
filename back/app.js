const express = require('express');
const cors = require('cors');
const loginRouter = require('./routers/loginRouter');
const errorHandler = require('./middleware/errorHandler/errorHandler');
const app = express();

//Middleware
app.use(cors());
//Routers
app.use(loginRouter);
app.use(errorHandler);

module.exports = app;
