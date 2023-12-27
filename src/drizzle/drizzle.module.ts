import { Global, Module } from '@nestjs/common';
import { DB_SERVICE, DbProvider } from './providers/drizzle.providers';

@Global()
@Module({
  providers: [DbProvider],
  exports: [DB_SERVICE, DbProvider],
})
export class DrizzleModule {}
