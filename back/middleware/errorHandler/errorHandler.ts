import { ErrorRequestHandler } from 'express';
import errorCodes from './errorCodes';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next): void => {
  for (const error in errorCodes) {
    if (errorCodes[error].message === err.message) {
      res
        .status(errorCodes[error].code)
        .json({ message: errorCodes[error].message });
      return;
    }
  }
  res.status(500).send(err.message);
};

export default errorHandler;
