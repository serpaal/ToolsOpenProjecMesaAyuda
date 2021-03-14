import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { logger }  from '../utils';
import { v4 } from 'uuid';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {   
    if(exception instanceof BadRequestException){
        exception.message = exception['response'].message;
    }
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorId = v4();
    logger.log({
        id: errorId,
        level: 'error',
        path: request.url,
        method: request.method,
        params: request.method === 'GET' ? request.query : request.body,               
        statusCode: status,
        message: exception.message
    });
    // Send response
    response
      .status(status)
      .json({
        statusCode: status,
        message: exception.message,
        path: request.url,
      });
  }
} 