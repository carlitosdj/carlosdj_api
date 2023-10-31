import { Module } from '@nestjs/common';
import { ComponentcommentService } from './componentcomment.service';
import { ComponentcommentController } from './componentcomment.controller';

@Module({
  controllers: [ComponentcommentController],
  providers: [ComponentcommentService],
})
export class ComponentcommentModule {}
