import { Injectable } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { InvalidLeadError } from 'src/errors/invalid-lead.error';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class LeadService {
  constructor(
    private prismaService: PrismaService,
    private mailService: MailService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async findAll(page: number, take: number) {
    if (page == 0) page = 1;
    const skip = take * (page - 1);

    const data = await this.prismaService.lead.findMany({ skip, take });
    const count = await this.prismaService.user.count();
    return {
      data,
      count,
    };
  }

  findOne(id: number) {
    return this.prismaService.lead.findFirstOrThrow({ where: { id } });
  }

  lists() {
    return this.prismaService.lead.findMany({
      select: { list: true },
      distinct: ['list'],
    });
  }

  searchLeads(search: string) {
    return this.prismaService.lead.findMany({
      where: {
        OR: [
          {
            name: { contains: search },
          },
          {
            email: { contains: search },
          },
          {
            origin: { contains: search },
          },
          {
            list: { contains: search },
          },
        ],
      },
    });
  }

  searchByList(list: string) {
    console.log('list', list);
    return this.prismaService.lead.findMany({
      where: { list },
    });
  }

  loadLead(list: string, email: string) {
    return this.prismaService.lead.findFirstOrThrow({
      where: { list, email },
    });
  }

  confirm(list: string, email: string) {
    const date = new Date();
    return this.prismaService.lead.update({
      where: {
        email_list: { list, email },
      },
      data: {
        confirm: 1,
        confirmed_at: date.getTime() / 1000,
      },
    });
  }

  notdisturb(list: string, email: string) {
    return this.prismaService.lead.update({
      where: {
        email_list: { list, email },
      },
      data: { naoperturbe: 1 },
    });
  }

  async leadExists(email: string, list: string) {
    return (
      (await this.prismaService.lead.count({
        where: {
          AND: [{ email }, { list }],
        },
      })) !== 0
    );
  }

  async create(createLeadDto: CreateLeadDto) {
    const date = new Date();
    if (await this.leadExists(createLeadDto.email, createLeadDto.list)) {
      throw new InvalidLeadError('Lead already exists in this list.');
    } else {
      //Envia o primeiro email:
      await this.mailService.sendLeadConfirmation(createLeadDto);

      //Cron JOB pra amanhã. Disparo do segundo email:
      this.addCronJob('schedulemail', createLeadDto);

      return this.prismaService.lead.create({
        data: {
          ...createLeadDto,
          created_at: date.getTime() / 1000,
        },
      });
    }
  }

  // @Cron(new Date(Date.now() + 10 * 1000))
  // handleCron() {
  //   console.log('10 segundos após criado email');
  // }
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

  update(id: number, updateLeadDto: UpdateLeadDto) {
    return this.prismaService.lead.update({
      where: { id },
      data: updateLeadDto,
    });
  }

  remove(id: number) {
    return this.prismaService.lead.delete({ where: { id } });
  }
}
