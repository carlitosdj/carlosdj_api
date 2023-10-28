import { Injectable } from '@nestjs/common';
import { CreateComponentcompletedDto } from './dto/create-componentcompleted.dto';
import { UpdateComponentcompletedDto } from './dto/update-componentcompleted.dto';
// import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class ComponentcompletedService {
  // constructor(private prismaService: PrismaService) {}

  findAll() {
    // //return `This action returns all componentcompleted`;
    // return this.prismaService.componentCompleted.findMany();
  }

  findOne(id: number) {
    // return this.prismaService.componentCompleted.findFirstOrThrow({
    //   where: { id },
    // });
  }

  findByParent(componentId: number) {
    // return this.prismaService.componentCompleted.findMany({
    //   where: { componentId },
    // });
  }

  create(createComponentcompletedDto: CreateComponentcompletedDto) {
    const date = new Date();
    // return this.prismaService.componentCompleted.create({
    //   data: {
    //     ...createComponentcompletedDto,
    //     created_at: date.getTime() / 1000,
    //   },
    // });
  }

  update(id: number, updateComponentcompletedDto: UpdateComponentcompletedDto) {
    // return this.prismaService.componentCompleted.update({
    //   where: { id },
    //   data: updateComponentcompletedDto,
    // });
  }

  remove(id: number) {
    // //return `This action removes a #${id} componentcompleted`;
    // return this.prismaService.componentCompleted.delete({ where: { id } });
  }
}
