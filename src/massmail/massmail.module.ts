import { Module } from '@nestjs/common';
import { MassmailService } from './massmail.service';
import { MassmailController } from './massmail.controller';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [MailModule],
  controllers: [MassmailController],
  providers: [MassmailService],
})
export class MassmailModule {}
