import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/httpException';

function exceptionMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response
    .status(status)
    .send({
      message,
      status,
    });
}

export default exceptionMiddleware;