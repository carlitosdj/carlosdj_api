import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { InvalidLeadError } from '../errors/invalid-lead.error';

@Catch(InvalidLeadError)
export class InvalidLeadExceptionFilter extends BaseExceptionFilter {
  catch(exception: InvalidLeadError, host: ArgumentsHost) {
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
