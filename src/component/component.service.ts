import { Injectable } from '@nestjs/common';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ComponentService {
  constructor(private prismaService: PrismaService) {}

  findAll(page: number, take: number) {
    if (page == 0) page = 1;
    const skip = take * (page - 1);
    return this.prismaService.component.findMany({
      skip,
      take,
      include: {
        children: true,
        parent: true,
        ComponentExtra: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.component.findFirstOrThrow({
      where: { id },
      include: {
        children: {
          include: {
            ComponentAvailable: true,
          },
        },
        parent: true,
        ComponentExtra: true,
      },
    });
  }

  searchComponent(search: string) {
    return this.prismaService.component.findMany({
      where: {
        OR: [
          { name: { contains: search } },
          { description: { contains: search } },
        ],
      },
      include: {
        children: true,
        parent: true,
        ComponentExtra: true,
      },
    });
  }

  searchByDescription(search: string) {
    return this.prismaService.component.findFirstOrThrow({
      where: { description: search },
      include: { children: true, parent: true, ComponentExtra: true },
    });
  }

  async findModules(
    id: number,
    user_id: number,
    num_turma: string,
    orderby: Prisma.SortOrder,
  ) {
    return this.prismaService.component.findMany({
      where: {
        AND: [{ id }, { status: 1 }],
      },
      orderBy: { id: orderby },
      include: {
        children: {
          include: { ComponentExtra: true, ComponentAvailable: true },
        },
        parent: { include: { ComponentExtra: true } },
        ComponentAvailable: { where: { turma_num: num_turma } },
        ComponentCompleted: { where: { user_id } },
      },
    });
  }

  findClasses(id: number, user_id: number, orderby: Prisma.SortOrder) {
    return this.prismaService.component.findMany({
      where: { AND: [{ id }, { status: 1 }] },
      orderBy: { id: orderby },
      include: {
        children: { include: { ComponentExtra: true } },
        parent: { include: { ComponentExtra: true } },
        ComponentCompleted: { where: { user_id } },
        ComponentExtra: true,
        ComponentAvailable: true,
      },
    });
  }

  findLastLiveClass() {
    return this.prismaService.component.findFirst({
      orderBy: {
        id: 'desc',
      },
      include: { children: true, parent: true, ComponentExtra: true },
    });
  }

  findLastClassAttended(user_id: number) {
    return this.prismaService.component.findFirstOrThrow({
      where: { ComponentCompleted: { some: { user_id } } },
      orderBy: { id: 'desc' },
      include: { children: true, parent: true, ComponentExtra: true },
    });
  }

  create(createComponentDto: CreateComponentDto) {
    return this.prismaService.component.create({
      data: createComponentDto,
    });
  }

  update(id: number, updateComponentDto: UpdateComponentDto) {
    return this.prismaService.component.update({
      where: { id },
      data: updateComponentDto,
      include: {
        children: true,
        parent: true,
        ComponentExtra: true,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.component.delete({
      where: { id },
      include: {
        children: true,
        parent: true,
        ComponentExtra: true,
      },
    });
  }
}
