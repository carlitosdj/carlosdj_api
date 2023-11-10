import { Inject, Injectable } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
// import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { InvalidLeadError } from 'src/errors/invalid-lead.error';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { DB, DbType } from 'src/drizzle/providers/drizzle.providers';
import { and, asc, eq, like, or, sql } from 'drizzle-orm';
import * as schema from '../_schemas/schema';

@Injectable()
export class LeadService {
  constructor(
    // private prismaService: PrismaService,
    @Inject(DB) private readonly db: DbType,
    private mailService: MailService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async findAll(page: number, take: number) {
    if (page == 0) page = 1;
    const skip = take * (page - 1);

    const data = await this.db.query.lead.findMany({
      limit: take,
      offset: skip,
    });

    const result = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(schema.lead);

    return {
      data,
      //count: data.length,
      count: result[0].count,
    };

  }

  async findOne(id: number) {
    // return this.prismaService.lead.findFirstOrThrow({ where: { id } });
    return await this.db.query.lead.findFirst({
      where: eq(schema.lead.id, id),
    });
  }

  async lists() {
    // return this.prismaService.lead.findMany({
    //   select: { list: true },
    //   distinct: ['list'],
    // });
    const lists = await this.db
      .selectDistinct({ list: schema.lead.list })
      .from(schema.lead)
      .orderBy(asc(schema.lead.list));
    return lists;
  }

  async searchLeads(search: string) {
    const data = await this.db.query.lead.findMany({
      where: or(
        like(schema.lead.name, `%${search}%`),
        like(schema.lead.email, `%${search}%`),
        like(schema.lead.origin, `%${search}%`),
        like(schema.lead.list, `%${search}%`),
      ),
      // limit: take,
      // offset: skip,
    });
    return {
      data,
      count: data.length,
    };
  }

  async searchByList(list: string) {
    // console.log('list', list);
    // return this.prismaService.lead.findMany({
    //   where: { list },
    // });
    return await this.db.query.lead.findMany({
      where: eq(schema.lead.list, list),
    });
  }

  async loadLead(list: string, email: string) {
    // return this.prismaService.lead.findFirstOrThrow({
    //   where: { list, email },
    // });
    return await this.db.query.lead.findFirst({
      where: and(eq(schema.lead.list, list), eq(schema.lead.email, email)),
    });
  }

  async confirm(list: string, email: string) {
    const date = new Date();
    await this.db
      .update(schema.lead)
      .set({
        confirm: 1,
        confirmedAt: date.getTime() / 1000,
      })
      .where(and(eq(schema.lead.list, list), eq(schema.lead.email, email)));

    return await this.db.query.lead.findFirst({
      where: and(eq(schema.lead.list, list), eq(schema.lead.email, email)),
    });
  }

  async notdisturb(list: string, email: string) {
    const date = new Date();
    await this.db
      .update(schema.lead)
      .set({
        naoperturbe: 1,
      })
      .where(and(eq(schema.lead.list, list), eq(schema.lead.email, email)));

    return await this.db.query.lead.findFirst({
      where: and(eq(schema.lead.list, list), eq(schema.lead.email, email)),
    });
  }

  async leadExists(email: string, list: string) {
    const result = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(schema.lead)
      .where(and(eq(schema.lead.email, email), eq(schema.lead.list, list)));
    return result[0].count !== 0;
  }

  async create(createLeadDto: CreateLeadDto) {
    const date = new Date();
    if (await this.leadExists(createLeadDto.email, createLeadDto.list)) {
      throw new InvalidLeadError('Lead already exists in this list.');
    } else {
      //Envia o primeiro email:
      this.mailService.sendLeadConfirmation(createLeadDto);

      //Cron JOB pra amanhã. Disparo do segundo email:
      //this.addCronJob('schedulemail', createLeadDto);
      const newItem = await this.db.insert(schema.lead).values(createLeadDto);
      return await this.db.query.lead.findFirst({
        where: eq(schema.lead.id, newItem[0].insertId),
      });
    }
  }

  async addCronJob(name: string, createLeadDto: CreateLeadDto) {
    const date = new Date(Date.now() + 24 * 60 * 60 * 1000); //Schedule to 24h later
    //const date = new Date(Date.now() + 20 * 1000);
    const job: any = new CronJob(date, async () => {
      //const job: any = new CronJob(`${seconds} * * * * *`, () => {
      await this.mailService.sendSecondMail(createLeadDto);
      console.log(
        `Job ${name}. Email sent to: ${createLeadDto.email} at (${date})`,
      );
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    console.log(
      `Job ${name}: Schedule email to: ${createLeadDto.email} at: ${date}!`,
    );
  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    console.log(`job ${name} deleted!`);
  }

  async getCrons() {
    const jobs = this.schedulerRegistry.getCronJobs();
    const arr: any = [];

    jobs.forEach((value, key, map) => {
      //console.log('map', map);
      let next;
      try {
        next = value.nextDates().toJSDate();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
      arr.push({ msg: `job: ${key} -> next: ${next}` });
    });

    //console.log('arr', arr);
    return { ...arr };
  }

  async update(id: number, updateLeadDto: UpdateLeadDto) {
    await this.db
      .update(schema.lead)
      .set(updateLeadDto)
      .where(eq(schema.lead.id, id));

    return await this.db.query.lead.findFirst({
      where: eq(schema.lead.id, id),
    });
  }

  async remove(id: number) {
    // return this.prismaService.lead.delete({ where: { id } });
    const itemRemoved = await this.db.query.lead.findFirst({
      where: eq(schema.lead.id, id),
    });
    await this.db.delete(schema.lead).where(eq(schema.lead.id, id));
    return itemRemoved;
    // return this.prismaService.componentExtra.delete({ where: { id } });
  }
}
