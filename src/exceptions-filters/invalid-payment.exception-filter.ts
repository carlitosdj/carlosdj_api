import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { InvalidPaymentError } from 'src/errors/invalid-payment.error';

@Catch(InvalidPaymentError)
export class InvalidPaymentExceptionFilter extends BaseExceptionFilter {
  catch(exception: InvalidPaymentError, host: ArgumentsHost) {
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
