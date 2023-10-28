import { Global, Module } from '@nestjs/common';
import { DB, DbProvider } from './providers/drizzle.providers';

@Global()
@Module({
  providers: [DbProvider],
  exports: [DB],
})
export class DrizzleModule {}
