import { Injectable } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class LeadService {
  constructor(private prismaService: PrismaService) {}

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

  create(createLeadDto: CreateLeadDto) {
    const date = new Date();
    return this.prismaService.lead.create({
      data: {
        ...createLeadDto,
        created_at: date.getTime() / 1000,
      },
    });
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
