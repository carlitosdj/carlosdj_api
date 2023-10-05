import { Module } from '@nestjs/common';
import { ComponentavailableService } from './componentavailable.service';
import { ComponentavailableController } from './componentavailable.controller';

@Module({
  controllers: [ComponentavailableController],
  providers: [ComponentavailableService],
})
export class ComponentavailableModule {}
