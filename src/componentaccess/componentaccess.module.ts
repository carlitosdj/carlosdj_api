import { Module } from '@nestjs/common';
import { ComponentaccessService } from './componentaccess.service';
import { ComponentaccessController } from './componentaccess.controller';

@Module({
  controllers: [ComponentaccessController],
  providers: [ComponentaccessService],
})
export class ComponentaccessModule {}
