import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { InvalidRelationError } from '../errors/invalid-relation.error';

@Catch(InvalidRelationError)
export class InvalidRelationExceptionFilter extends BaseExceptionFilter {
  catch(exception: InvalidRelationError, host: ArgumentsHost) {
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
