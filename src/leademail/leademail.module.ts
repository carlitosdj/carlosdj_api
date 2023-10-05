import { Module } from '@nestjs/common';
import { LeademailService } from './leademail.service';
import { LeademailController } from './leademail.controller';

@Module({
  controllers: [LeademailController],
  providers: [LeademailService],
})
export class LeademailModule {}
