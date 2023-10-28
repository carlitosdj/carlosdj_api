import { Injectable } from '@nestjs/common';
import { CreateComponentavailableDto } from './dto/create-componentavailable.dto';
import { UpdateComponentavailableDto } from './dto/update-componentavailable.dto';
// import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class ComponentavailableService {
  // constructor(private prismaService: PrismaService) {}

  findAll() {
    // return this.prismaService.componentAvailable.findMany();
  }

  findOne(id: number) {
    // return this.prismaService.componentAvailable.findFirstOrThrow({
    //   where: { id },
    // });
  }

  findByParent(componentId: number) {
    // return this.prismaService.componentAvailable.findMany({
    //   where: { componentId },
    // });
  }

  create(createComponentavailableDto: CreateComponentavailableDto) {
    // return this.prismaService.componentAvailable.create({
    //   data: createComponentavailableDto,
    // });
  }

  update(id: number, updateComponentavailableDto: UpdateComponentavailableDto) {
    // //return `This action updates a #${id} componentavailable`;
    // return this.prismaService.componentAvailable.update({
    //   where: { id },
    //   data: updateComponentavailableDto,
    // });
  }

  remove(id: number) {
    //return `This action removes a #${id} componentavailable`;
    // return this.prismaService.componentAvailable.delete({ where: { id } });
  }
}
