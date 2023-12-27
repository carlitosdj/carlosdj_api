import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { InvalidUserError } from '../errors/invalid-user.error';

@Catch(InvalidUserError)
export class InvalidUserExceptionFilter extends BaseExceptionFilter {
  catch(exception: InvalidUserError, host: ArgumentsHost) {
    //logs em arquivo ... etc..

    const context = host.switchToHttp();
    const response = context.getResponse();

    return response.status(422).send({
      statusCode: 422,
      message: exception.message,
    });
    //return super.catch(exception, host);
  }
}
