import { Module } from '@nestjs/common';
import { WppcampService } from './wppcamp.service';
import { WppcampController } from './wppcamp.controller';

@Module({
  controllers: [WppcampController],
  providers: [WppcampService],
})
export class WppcampModule {}
