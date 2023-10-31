import { Module } from '@nestjs/common';
import { ComponentannotationService } from './componentannotation.service';
import { ComponentannotationController } from './componentannotation.controller';

@Module({
  controllers: [ComponentannotationController],
  providers: [ComponentannotationService],
})
export class ComponentannotationModule {}
