import { repl } from '@nestjs/core';
import { AppModule } from './app.module';
// repl = read eval print loop

async function bootstrap() {
  await repl(AppModule);
}

bootstrap();
