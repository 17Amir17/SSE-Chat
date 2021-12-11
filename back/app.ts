import express, { Request } from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import loginRouter from './routers/loginRouter';
import messageRouter from './routers/messageRouter';
import errorHandler from './middleware/errorHandler/errorHandler';
import userRequest from './middleware/messageHandler';

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
app.use('/login', loginRouter);
app.use('/message', userRequest, messageRouter);
//Static route
app.use(express.static(path.join(__dirname, '../../client/build/')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});
//Error handler
app.use(errorHandler);

module.exports = app;
