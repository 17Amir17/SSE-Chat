const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler/errorHandler');
const app = express();

//Middleware
app.use(cors());

app.use(errorHandler);

module.exports = app;
