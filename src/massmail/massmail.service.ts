import { Injectable } from '@nestjs/common';
import { CreateMassmailDto } from './dto/create-massmail.dto';
import { UpdateMassmailDto } from './dto/update-massmail.dto';
// import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class MassmailService {
  constructor(
    // private prismaService: PrismaService,
    private mailService: MailService,
  ) {}

  async create(CreateMassmailDto: CreateMassmailDto) {
    // const date = new Date();

    // const listLeads = await this.prismaService.lead.findMany({
    //   where: { list: CreateMassmailDto.list },
    //   distinct: ['email'],
    // });
    // // const listLeadsCount = await this.prismaService.lead.count({
    // //   where: { list: CreateMassmailDto.list },
    // //   //distinct: ['email'],
    // // });
    // console.log('Length', listLeads.length);

    // //Chama o serviço de envio de emails
    // await this.mailService.sendMassMail(
    //   listLeads,
    //   CreateMassmailDto.subject,
    //   CreateMassmailDto.message,
    // );

    // return this.prismaService.massMail.create({
    //   data: {
    //     ...CreateMassmailDto,
    //     created_at: date.getTime() / 1000,
    //     quantity: listLeads.length,
    //   },
    // });
  }

  findAll(page: number, take: number) {
    // if (page == 0) page = 1;
    // const skip = take * (page - 1);
    // return this.prismaService.massMail.findMany({
    //   skip,
    //   take,
    //   orderBy: { id: 'desc' },
    // });
  }

  findAllByList(list: string, page: number, take: number) {
    // if (page == 0) page = 1;
    // const skip = take * (page - 1);
    // return this.prismaService.massMail.findMany({
    //   skip,
    //   take,
    //   where: {
    //     list,
    //   },
    // });
  }

  findOne(id: number) {
    // return this.prismaService.massMail.findFirstOrThrow({
    //   where: { id },
    // });
  }

  update(id: number, UpdateMassmailDto: UpdateMassmailDto) {
    // return this.prismaService.massMail.update({
    //   where: { id },
    //   data: UpdateMassmailDto,
    // });
  }

  remove(id: number) {
    // return this.prismaService.massMail.delete({ where: { id } });
  }
}
