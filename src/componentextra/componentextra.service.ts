import { Injectable } from '@nestjs/common';
import { CreateComponentextraDto } from './dto/create-componentextra.dto';
import { UpdateComponentextraDto } from './dto/update-componentextra.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class ComponentextraService {
  constructor(private prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.componentExtra.findMany();
  }

  findOne(id: number) {
    return this.prismaService.componentExtra.findFirstOrThrow({
      where: { id },
    });
  }

  findByParent(component_id: number) {
    return this.prismaService.componentExtra.findMany({
      where: { component_id },
    });
  }

  create(createComponentextraDto: CreateComponentextraDto) {
    const date = new Date();
    return this.prismaService.componentExtra.create({
      data: {
        ...createComponentextraDto,
        created_at: date.getTime() / 1000,
      },
    });
  }

  update(id: number, updateComponentextraDto: UpdateComponentextraDto) {
    return this.prismaService.componentExtra.update({
      where: { id },
      data: updateComponentextraDto,
    });
  }

  remove(id: number) {
    return this.prismaService.componentExtra.delete({ where: { id } });
  }
}
