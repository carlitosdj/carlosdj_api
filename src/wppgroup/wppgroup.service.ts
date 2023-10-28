import { Injectable } from '@nestjs/common';
import { CreateWppgroupDto } from './dto/create-wppgroup.dto';
import { UpdateWppgroupDto } from './dto/update-wppgroup.dto';
// import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class WppgroupService {
  // constructor(private prismaService: PrismaService) {}

  findAll(page: number, take: number) {
    if (page == 0) page = 1;
    const skip = take * (page - 1);
    // return this.prismaService.wppGroup.findMany({
    //   skip,
    //   take,
    // });
  }

  findByGroup(camp_id: number, page: number, take: number) {
    if (page == 0) page = 1;
    const skip = take * (page - 1);
    // return this.prismaService.wppGroup.findMany({
    //   skip,
    //   take,
    //   where: {
    //     camp_id,
    //   },
    // });
  }

  findOne(id: number) {
    // return this.prismaService.wppGroup.findFirstOrThrow({
    //   where: { id },
    // });
  }

  create(createWppgroupDto: CreateWppgroupDto) {
    const date = new Date();
    // return this.prismaService.wppGroup.create({
    //   data: { ...createWppgroupDto, created_at: date.getTime() / 1000 },
    // });
  }

  update(id: number, updateWppgroupDto: UpdateWppgroupDto) {
    // return this.prismaService.wppGroup.update({
    //   where: { id },
    //   data: updateWppgroupDto,
    // });
  }

  remove(id: number) {
    // return this.prismaService.wppGroup.delete({ where: { id } });
  }
}
