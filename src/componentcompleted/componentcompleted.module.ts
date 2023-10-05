import { Module } from '@nestjs/common';
import { ComponentcompletedService } from './componentcompleted.service';
import { ComponentcompletedController } from './componentcompleted.controller';

@Module({
  controllers: [ComponentcompletedController],
  providers: [ComponentcompletedService],
})
export class ComponentcompletedModule {}
