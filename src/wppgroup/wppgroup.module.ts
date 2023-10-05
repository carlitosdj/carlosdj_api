import { Module } from '@nestjs/common';
import { WppgroupService } from './wppgroup.service';
import { WppgroupController } from './wppgroup.controller';

@Module({
  controllers: [WppgroupController],
  providers: [WppgroupService],
})
export class WppgroupModule {}
