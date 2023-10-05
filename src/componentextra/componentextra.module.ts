import { Module } from '@nestjs/common';
import { ComponentextraService } from './componentextra.service';
import { ComponentextraController } from './componentextra.controller';

@Module({
  controllers: [ComponentextraController],
  providers: [ComponentextraService],
})
export class ComponentextraModule {}
