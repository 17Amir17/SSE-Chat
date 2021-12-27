import express, { Request } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import authRouter from './routers/authRouter';
import messageRouter from './routers/messageRouter';
import errorHandler from './middleware/errorHandler/errorHandler';
import userRequest from './middleware/auth';

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Morgan Freeman
morgan.token('body', (req: Request, _res) => {
  return JSON.stringify(req.body);
});
app.use(morgan(':method :url :body'));
//Routers
app.use('/auth', authRouter);
app.use('/message', userRequest, messageRouter);
//Static route
app.use(express.static(path.join(__dirname, '../../client/build/')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});
//Error handler
app.use(errorHandler);

module.exports = app;
