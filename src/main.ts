import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './exceptions-filters/prisma.exception-filter';
import { InvalidRelationExceptionFilter } from './exceptions-filters/invalid-relation.exception-filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { InvalidUserExceptionFilter } from './exceptions-filters/invalid-user.exception-filter';
import { InvalidLeadExceptionFilter } from './exceptions-filters/invalid-lead.exception-filter';
import { InvalidPaymentError } from './errors/invalid-payment.error';
import { InvalidPaymentExceptionFilter } from './exceptions-filters/invalid-payment.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(
    new PrismaExceptionFilter(),
    new InvalidRelationExceptionFilter(),
    new InvalidUserExceptionFilter(),
    new InvalidLeadExceptionFilter(),
    new InvalidPaymentExceptionFilter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('NestJs 10 - Video Api')
    .setDescription('The video Api description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
