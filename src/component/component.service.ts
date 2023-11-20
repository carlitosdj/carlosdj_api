import { Inject, Injectable } from '@nestjs/common';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
// import { Component, Prisma, PrismaClient } from '@prisma/client';
// import { LazyModuleLoader } from '@nestjs/core';
import { DB, DbType } from 'src/drizzle/providers/drizzle.providers';
import { and, asc, desc, eq, ilike, like, or } from 'drizzle-orm';
import * as schema from '../_schemas/schema';

@Injectable()
export class ComponentService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async findAll(page: number, take: number) {
    if (page == 0) page = 1;
    const skip = take * (page - 1);

    return await this.db.query.component.findMany({
      with: {
        extras: true,
        parent: true,
        children: {
          with: {
            extras: true,
            available: true,
          },
        },
      },
      limit: take,
      offset: skip,
    });
  }

  async findOne(id: number, sort: string) {
    return await this.db.query.component.findFirst({
      with: {
        extras: true,
        parent: true,
        children: {
          with: {
            extras: true,
            available: true,
          },
        },
      },
      where: eq(schema.component.id, id),
      orderBy:
        sort === 'asc' ? asc(schema.component.id) : desc(schema.component.id),
    });
  }

  async searchComponent(search: string) {
    return await this.db.query.component.findMany({
      where: or(
        like(schema.component.tags, `%${search}%`),
        //like(schema.component.description, `%${search}%`),
      ),
      with: {
        extras: true,
        parent: true,
        children: {
          with: {
            extras: true,
            available: true,
          },
        },
      },
      // limit: take,
      // offset: skip,
    });
  }

  async searchByDescription(search: string) {
    return await this.db.query.component.findFirst({
      with: {
        extras: true,
        parent: true,
        children: {
          with: {
            extras: true,
            available: true,
          },
        },
      },
      where: eq(schema.component.description, search),
    });
  }

  async findModules(
    id: number,
    user_id: number,
    num_turma: string,
    orderby: string,
  ) {
    return await this.db.query.component.findMany({
      where: and(
        eq(schema.component.componentId, id),
        eq(schema.component.status, 1),
      ),
      with: {
        extras: true,
        parent: {
          with: {
            extras: true,
          },
        },
        children: {
          with: {
            extras: true,
            available: true,
            completed: {
              where: eq(schema.componentCompleted.userId, user_id),
            },
          },
        },
        available: {
          where: eq(schema.componentAvailable.turmaNum, num_turma),
        },
        
        
        //ComponentCompleted: { where: { user_id } },
        //ComponentAvailable: { where: { turma_num: num_turma } },
      },
      orderBy:
        orderby === 'asc'
          ? asc(schema.component.id)
          : desc(schema.component.id),
      // limit: take,
      // offset: skip,
    });
    // return await this.prismaService.component.findMany({
    //   where: {
    //     AND: [{ componentId: id }, { status: 1 }],
    //   },
    //   orderBy: { id: orderby },
    //   include: {
    //     children: {
    //       include: { extras: true, ComponentAvailable: true },
    //     },
    //     parent: { include: { extras: true } },
    //     ComponentAvailable: { where: { turma_num: num_turma } },
    //     ComponentCompleted: { where: { user_id } },
    //   },
    // });
  }

  async findClasses(id: number, user_id: number, orderby: string) {
    // return await this.prismaService.component.findMany({
    //   where: { AND: [{ componentId: id }, { status: 1 }] },
    //   orderBy: { id: orderby },
    //   include: {
    //     children: { include: { extras: true } },
    //     parent: { include: { extras: true } },
    //     ComponentCompleted: { where: { user_id } },
    //     extras: true,
    //     ComponentAvailable: true,
    //   },
    // });
    
    console.log("FIND CLASSES componentId", id)
    console.log("FIND CLASSES user_id", user_id)

    return await this.db.query.component.findMany({
      where: and(
        eq(schema.component.componentId, id),
        eq(schema.component.status, 1),
      ),
      with: {
        extras: true,
        parent: {
          with: {
            extras: true,
          },
        },
        children: {
          with: {
            extras: true,
            available: true,
          },
        },
        available: true,
        completed: {
          where: eq(schema.componentCompleted.userId, user_id),
        },
        //ComponentCompleted: { where: { user_id } },
        //ComponentAvailable: true,
      },
      orderBy:
        orderby === 'asc'
          ? asc(schema.component.id)
          : desc(schema.component.id),
      // limit: take,
      // offset: skip,
    });
  }

  async findLastLiveClass() {
    // return await this.prismaService.component.findFirst({
    //   orderBy: {
    //     id: 'desc',
    //   },
    //   include: { children: true, parent: true, extras: true },
    // });
    return await this.db.query.component.findFirst({
      with: {
        extras: true,
        parent: true,
        children: {
          with: {
            extras: true,
            available: true,
          },
        },
      },
      orderBy: desc(schema.component.id),
    });
  }

  async findLastClassAttended(user_id: number) {
    // return await this.prismaService.component.findFirstOrThrow({
    //   where: { ComponentCompleted: { some: { user_id } } },
    //   orderBy: { id: 'desc' },
    //   include: { children: true, parent: true, extras: true },
    // });
    return await this.db.query.component.findFirst({
      with: {
        // completed: {
        //   where: some
        // },
        extras: true,
        parent: true,
        children: {
          with: {
            extras: true,
            available: true,
          },
        },
      },
    });
  }

  async create(createComponentDto: CreateComponentDto) {
    const newItem = await this.db
      .insert(schema.component)
      .values(createComponentDto);
    return await this.db.query.component.findFirst({
      where: eq(schema.component.id, newItem[0].insertId),
    });

    // return await this.prismaService.component.create({
    //   data: createComponentDto,
    // });
  }

  async update(id: number, updateComponentDto: UpdateComponentDto) {
    //update item
    await this.db
      .update(schema.component)
      .set(updateComponentDto)
      .where(eq(schema.component.id, id));

    return await this.db.query.component.findFirst({
      where: eq(schema.component.id, id),
      with: {
        children: true,
        parent: true,
        extras: true,
      },
    });

    // return await this.prismaService.component.update({
    //   where: { id },
    //   data: updateComponentDto,
    //   include: {
    //     children: true,
    //     parent: true,
    //     extras: true,
    //   },
    // });
  }

  async remove(id: number) {
    const itemRemoved = await this.db.query.component.findFirst({
      where: eq(schema.component.id, id),
    });
    await this.db.delete(schema.component).where(eq(schema.component.id, id))
    return itemRemoved;
    // return await this.prismaService.component.delete({
    //   where: { id },
    //   include: {
    //     children: true,
    //     parent: true,
    //     extras: true,
    //   },
    // });
  }
}
