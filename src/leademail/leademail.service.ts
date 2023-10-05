import { Injectable } from '@nestjs/common';
import { CreateLeademailDto } from './dto/create-leademail.dto';
import { UpdateLeademailDto } from './dto/update-leademail.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class LeademailService {
  constructor(private prismaService: PrismaService) {}
  create(createLeademailDto: CreateLeademailDto) {
    const date = new Date();
    return this.prismaService.leadEmail.create({
      data: { ...createLeademailDto, created_at: date.getTime() / 1000 },
    });
  }

  findAll(page: number, take: number) {
    if (page == 0) page = 1;
    const skip = take * (page - 1);
    return this.prismaService.leadEmail.findMany({ skip, take });
  }

  findAllByList(list: string, page: number, take: number) {
    if (page == 0) page = 1;
    const skip = take * (page - 1);
    return this.prismaService.leadEmail.findMany({
      skip,
      take,
      where: {
        list,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.leadEmail.findFirstOrThrow({
      where: { id },
    });
  }

  update(id: number, updateLeademailDto: UpdateLeademailDto) {
    return this.prismaService.leadEmail.update({
      where: { id },
      data: updateLeademailDto,
    });
  }

  remove(id: number) {
    return this.prismaService.leadEmail.delete({ where: { id } });
  }
}
