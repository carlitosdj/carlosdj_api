import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateLeadDto } from 'src/lead/dto/create-lead.dto';

//var nodemailer = require('nodemailer');

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendLeadConfirmation(lead: CreateLeadDto) {
    const url_gforms = `https://forms.gle/Gxs8H8GQEifNXuf89`;
    const url_confirm = `http://localhost:3015/lead/confirm/${lead.list}/${lead.email}`;
    const expert = 'Carlos Defelicibus Junior';
    const eventName = 'EVENTO123';

    await this.mailerService
      .sendMail({
        to: lead.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Bem vindo',
        template: './confirmation', // `.hbs` extension is appended automatically
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
    const url_gforms = `https://forms.gle/Gxs8H8GQEifNXuf89`;
    const url_confirm = `http://localhost:3015/lead/confirm/${lead.list}/${lead.email}`;
    const expert = 'Carlos Defelicibus Junior';
    const eventName = 'EVENTO123';

    await this.mailerService
      .sendMail({
        to: lead.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: `Tudo que você precisa saber para acessar o: ${eventName}`,
        template: './secondmail', // `.hbs` extension is appended automatically
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

  async sendMassMail(list: any[], subjectText: string, messageText: string) {
    //CORRIGIR
    await list.map((email) => {
      this.mailerService.sendMail({
        to: email.email,
        subject: subjectText,
        text: messageText,
        html: messageText,
      });
    });
    return;
  }
}
