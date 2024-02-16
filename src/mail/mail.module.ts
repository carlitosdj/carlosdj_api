import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        pool: true,
        maxConnections: 20,
        maxMessages: 200,
        host: 'mail.carlosdj.com.br',
        service: 'mail.carlosdj.com.br',
        port: 465,
        secure: true,
        auth: {
          user: 'evento@carlosdj.com.br',
          pass: 'cdj6em7@@',
        },
      },
      defaults: {
        from: '"Carlos Defelicibus Junior" <evento@carlosdj.com.br>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService], // 👈 export for DI
})
export class MailModule {}
