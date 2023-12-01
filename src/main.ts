import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { PrismaExceptionFilter } from './exceptions-filters/prisma.exception-filter';
import { InvalidRelationExceptionFilter } from './exceptions-filters/invalid-relation.exception-filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { InvalidUserExceptionFilter } from './exceptions-filters/invalid-user.exception-filter';
import { InvalidLeadExceptionFilter } from './exceptions-filters/invalid-lead.exception-filter';
import { InvalidPaymentExceptionFilter } from './exceptions-filters/invalid-payment.exception-filter';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { LoggingInterceptor } from './logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    //new FastifyAdapter(),
    {
      cors: {
        origin: ["http://localhost","/\.institutodefelicibus\.com$/"],
      },
    },
  );

  //app.enableCors();
  app.useGlobalFilters(
    //new PrismaExceptionFilter(),
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
  app.useGlobalInterceptors(new LoggingInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Carlitos API')
    .setDescription('Entrypoints to Carlitos API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  //await app.listen(3000);
  await app.listen(3000, '0.0.0.0', () =>
    console.log(`Monolito INSTITUTODEFELICIBUS - Listening on port: 3000`),
  );
}
bootstrap();
