import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
// import { Schema } from 'node:inspector';
import { CreateLeadDto } from '../lead/dto/create-lead.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// import * as schema from '../_schemas/schema';
// import { User } from 'src/user/entities/user.entity';
// import { UserService } from 'src/user/user.service';
//var nodemailer = require('nodemailer');

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendLeadConfirmation(lead: CreateLeadDto) {
    const url_gforms = `https://forms.gle/K7q85m1LCeYp1iDC7`;
    const url_confirm = `https://evnt.carlosdj.com.br/lead/confirm/${lead.list}/${lead.email}`;
    const expert = 'Carlos Defelicibus Junior';
    const eventName = 'Alavanque Seu Serviço';

    await this.mailerService
      .sendMail({
        to: lead.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Preciso da sua ajuda | Alavanque seu serviço',
        template: '../../../mail/templates/confirmation', // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          name: lead.name,
          eventName,
          expert,
          url_gforms,
          url_confirm,
        },
      })
      .then((res) => console.log('res', res.envelope.to))
      .catch((err) => {
        console.log('err', err);
      });
    //console.log('sent email', lead.email);
  }

  async sendSecondMail(lead: CreateLeadDto) {
    const url_gforms = `https://forms.gle/K7q85m1LCeYp1iDC7`;
    const url_confirm = `https://evnt.carlosdj.com.br/lead/confirm/${lead.list}/${lead.email}`;
    const expert = 'Carlos Defelicibus Junior';
    const eventName = 'Alavanque Seu Serviço';

    await this.mailerService
      .sendMail({
        to: lead.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: `Tudo que você precisa saber para acessar o: ${eventName}`,
        template: '../../../mail/templates/secondmail', // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          name: lead.name,
          eventName,
          expert,
          url_gforms,
          url_confirm,
        },
      })
      .then((res) => console.log('res', res.envelope.to))
      .catch((err) => {
        console.log('err', err);
      });
    //console.log('sent email', lead.email);
  }

  async sendRecoveryMail(user: CreateUserDto) { //TODO: achar o type disso aqui (treta: auth_key com authKey)
    const url = `https://metodo3c.carlosdj.com.br/auth/change/${user.email}/${user.authKey}`;

    await this.mailerService
      .sendMail({
        to: user.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: `Recuperação de senha`,
        template: '../../../mail/templates/recovery', // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          name: user.name,
          url,
        },
      })
      .then((res) => console.log('res', res.envelope.to))
      .catch((err) => {
        console.log('err', err);
      });
    //console.log('sent email', lead.email);
  }

  async sendMassMail(list: any[], subjectText: string, messageText: string) {
    //CORRIGIR

    await list.map((email) => {
      const url = `https://evnt.carlosdj.com.br/lead/unsubscribe/${email.list}/${email.email}`;
      this.mailerService.sendMail({
        to: email.email,
        subject: subjectText,
        // text: messageText,
        // html: messageText,
        template: '../../../mail/templates/massmail', // `.hbs` extension is appended automatically
        // template: {
        //   dir: '../../../mail/templates/massmail',
        //   adapter: new HandlebarsAdapter(),
        //   options: {
        //     strict: true,
        //   },
        // },
        context: {
          // ✏️ filling curly brackets with content
          name: email.name.split(' ')[0],
          text: messageText,
          url,
        },
      });
    });
    return;
  }
}
