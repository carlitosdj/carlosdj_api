import { Injectable } from '@nestjs/common';
import { CreateWppcampDto } from './dto/create-wppcamp.dto';
import { UpdateWppcampDto } from './dto/update-wppcamp.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class WppcampService {
  constructor(private prismaService: PrismaService) {}

  findAll(page: number, take: number) {
    if (page == 0) page = 1;
    const skip = take * (page - 1);
    return this.prismaService.wppCamp.findMany({
      skip,
      take,
    });
  }

  findOne(id: number) {
    return this.prismaService.wppCamp.findFirstOrThrow({
      where: { id },
      include: {
        wppgroup: true,
      },
    });
  }

  create(createWppcampDto: CreateWppcampDto) {
    return this.prismaService.wppCamp.create({
      data: createWppcampDto,
    });
  }

  update(id: number, updateWppcampDto: UpdateWppcampDto) {
    return this.prismaService.wppCamp.update({
      where: { id },
      data: updateWppcampDto,
    });
  }

  remove(id: number) {
    return this.prismaService.wppCamp.delete({ where: { id } });
  }
}
