import { Inject, Injectable } from '@nestjs/common';
import { CreateMassmailDto } from './dto/create-massmail.dto';
import { UpdateMassmailDto } from './dto/update-massmail.dto';

import { MailService } from '../mail/mail.service';
import { DB_SERVICE, DbType } from '../drizzle/providers/drizzle.providers';
import { desc, eq } from 'drizzle-orm';
import * as schema from '../_schemas/schema';

@Injectable()
export class MassmailService {
  constructor(
    @Inject(DB_SERVICE) private readonly db: DbType,
    // private prismaService: PrismaService,
    private mailService: MailService,
  ) {}

  async findAll(page: number, take: number) {
    // if (page == 0) page = 1;
    // const skip = take * (page - 1);
    // return this.prismaService.massMail.findMany({
    //   skip,
    //   take,
    //   orderBy: { id: 'desc' },
    // });
    if (page == 0) page = 1;
    const skip = take * (page - 1);

    const data = await this.db.query.massMail.findMany({
      limit: take,
      offset: skip,
      orderBy: desc(schema.massMail.id),
    });

    return data;
  }

  async findAllByList(list: string, page: number, take: number) {
    // if (page == 0) page = 1;
    // const skip = take * (page - 1);
    // return this.prismaService.massMail.findMany({
    //   skip,
    //   take,
    //   where: {
    //     list,
    //   },
    // });
    if (page == 0) page = 1;
    const skip = take * (page - 1);

    const data = await this.db.query.massMail.findMany({
      where: eq(schema.massMail.list, list),
      limit: take,
      offset: skip,
      //orderBy: desc(schema.massMail.id),
    });

    return data;
  }

  async findOne(id: number) {
    // return this.prismaService.massMail.findFirstOrThrow({
    //   where: { id },
    // });

    return await this.db.query.massMail.findFirst({
      where: eq(schema.massMail.id, id),
      //orderBy: desc(schema.massMail.id),
    });
  }

  async create(CreateMassmailDto: CreateMassmailDto) {
    const date = new Date();

    //Achar lista de emails distintos: TODO: Falta colocar distinct
    const listLeads = await this.db.query.lead.findMany({
      //where: { list: CreateMassmailDto.list },
      where: eq(schema.lead.list, CreateMassmailDto.list),
      //distinct: ['email'],
    });

    const listLeadsCount = listLeads.length;

    //console.log('Length', listLeads.length);

    // //Chama o serviço de envio de emails
    await this.mailService.sendMassMail(
      listLeads,
      CreateMassmailDto.subject,
      CreateMassmailDto.message,
    );

    const newItem = await this.db.insert(schema.massMail).values({
      ...CreateMassmailDto,
      //created_at: date.getTime() / 1000,
      quantity: listLeadsCount,
    });

    return await this.db.query.massMail.findFirst({
      where: eq(schema.massMail.id, newItem[0].insertId),
    });

    // return this.prismaService.massMail.create({
    //   data: {
    //     ...CreateMassmailDto,
    //     created_at: date.getTime() / 1000,
    //     quantity: listLeadsCount,
    //   },
    // });
  }

  async update(id: number, UpdateMassmailDto: UpdateMassmailDto) {
    // return this.prismaService.massMail.update({
    //   where: { id },
    //   data: UpdateMassmailDto,
    // });

    await this.db
      .update(schema.massMail)
      .set(UpdateMassmailDto)
      .where(eq(schema.massMail.id, id));

    return await this.db.query.massMail.findFirst({
      where: eq(schema.massMail.id, id),
    });

  }

  async remove(id: number) {
    // return this.prismaService.massMail.delete({ where: { id } });
    const itemRemoved = await this.db.query.massMail.findFirst({
      where: eq(schema.massMail.id, id),
    });
    await this.db.delete(schema.massMail).where(eq(schema.massMail.id, id));
    return itemRemoved;
  }
}
