import express from 'express';
import cors from 'cors';
import loginRouter from './routers/loginRouter';
import messageRouter from './routers/messageRouter';
import errorHandler from './middleware/errorHandler/errorHandler';
import userRequest from './middleware/messageHandler';

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Routers
app.use('/login', loginRouter);
app.use('/message', userRequest, messageRouter);
//Error handler
app.use(errorHandler);

module.exports = app;
