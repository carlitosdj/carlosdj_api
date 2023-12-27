import { Inject, Injectable } from '@nestjs/common';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
// import { LazyModuleLoader } from '@nestjs/core';
//import { DB, DbType } from 'src/drizzle/providers/drizzle.providers';
import { DB_SERVICE, DbType } from '../drizzle/providers/drizzle.providers';
import { and, asc, desc, eq, like, or } from 'drizzle-orm';
import * as schema from '../_schemas/schema';
import { CreateLaunchDto } from './dto/create-launch.dto';

@Injectable()
export class ComponentService {
  constructor(@Inject(DB_SERVICE) private readonly db: DbType) {}

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
          orderBy:
            sort === 'asc'
              ? asc(schema.component.id)
              : desc(schema.component.id),
        },
      },
      where: eq(schema.component.id, id),
    });
  }

  async findCoursesByUserId(id: number, userId: number, sort: string) {
    return await this.db.query.component.findFirst({
      with: {
        extras: true,
        parent: true,
        children: {
          where: eq(schema.component.status, '1'),
          with: {
            extras: true,
            available: true,
            access: {
              where: and(
                eq(schema.componentAccess.userId, userId),
                eq(schema.componentAccess.status, '1'),
              ),
            },
          },
          orderBy:
            sort === 'asc'
              ? asc(schema.component.id)
              : desc(schema.component.id),
        },
      },
      where: eq(schema.component.id, id),
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
    console.log('numturma', num_turma);
    return await this.db.query.component.findMany({
      where: and(
        eq(schema.component.componentId, id),
        eq(schema.component.status, '1'),
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
            //available: true,
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

    // console.log('FIND CLASSES componentId', id);
    // console.log('FIND CLASSES user_id', user_id);

    return await this.db.query.component.findMany({
      where: and(
        eq(schema.component.componentId, id),
        eq(schema.component.status, '1'),
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

async findLastClassAttended(userId: number) {
  const lastCompleted = await this.db.query.componentCompleted.findFirst({
    where: eq(schema.componentCompleted.userId, userId),
    with: {
      component: {
        with: {
          extras: true,
          parent: {
            with: {
              parent: true,
            },
          },
          children: true,
        },
      },
    },
    orderBy: desc(schema.componentCompleted.updatedAt),
  });

  return lastCompleted.component;
}

  async create(createComponentDto: CreateComponentDto) {
    const insertedItem = await this.db
      .insert(schema.component)
      .values(createComponentDto);

    const insertedId = insertedItem[0].insertId;

    const component = await this.db.query.component.findFirst({
      where: eq(schema.component.id, insertedId),
    });

    return component;
  }

  async createLaunch(createLaunchDto: CreateLaunchDto) {
    // console.log("createLaunchDto",createLaunchDto)

    return await this.db.transaction(async (tx) => {
      const launch = await this.db.insert(schema.component).values({
        name: createLaunchDto.name,
        description: createLaunchDto.description,
        componentId: createLaunchDto.componentId,
      });

      //################ LEADS ################
      const phaseLeads = await this.db.insert(schema.component).values({
        name: 'Captação de lead',
        description: 'lead-' + createLaunchDto.slug,
        componentId: launch[0].insertId,
      });

      const extrasLeads = await this.db.insert(schema.componentExtra).values([
        {
          keyExtra: 'eventName',
          valueExtra: createLaunchDto.eventName,
          componentId: phaseLeads[0].insertId,
        },
        {
          keyExtra: 'eventHeadline',
          valueExtra: createLaunchDto.eventHeadline,
          componentId: phaseLeads[0].insertId,
        },
        {
          keyExtra: 'eventDescription',
          valueExtra: createLaunchDto.eventDescription,
          componentId: phaseLeads[0].insertId,
        },
        {
          keyExtra: 'eventStartDate',
          valueExtra: createLaunchDto.dateCpl1,
          componentId: phaseLeads[0].insertId,
        },
        {
          keyExtra: 'eventEndDate',
          valueExtra: createLaunchDto.dateCpl3,
          componentId: phaseLeads[0].insertId,
        },
        {
          keyExtra: 'expertName',
          valueExtra: createLaunchDto.expertName,
          componentId: phaseLeads[0].insertId,
        },

        {
          keyExtra: 'eventImg',
          valueExtra: '1686071778354-Logo-preconexao.png',
          componentId: phaseLeads[0].insertId,
        },
        {
          keyExtra: 'eventBtn',
          valueExtra: 'Quero participar do evento',
          componentId: phaseLeads[0].insertId,
        },
        {
          keyExtra: 'eventGroupLink',
          valueExtra: 'http://localhost:3015/viawhats/campanha-teste',
          componentId: phaseLeads[0].insertId,
        },

        {
          keyExtra: 'leadSignUpStartDate',
          valueExtra: createLaunchDto.leadSignUpStartDate,
          componentId: phaseLeads[0].insertId,
        },
        {
          keyExtra: 'leadSignUpEndDate',
          valueExtra: createLaunchDto.leadSignUpEndDate,
          componentId: phaseLeads[0].insertId,
        },
      ]);

      //################ LEADS ################
      const phaseEvent = await this.db.insert(schema.component).values({
        name: 'Evento',
        description: 'event-' + createLaunchDto.slug,
        componentId: launch[0].insertId,
      });

      const extrasEvent = await this.db.insert(schema.componentExtra).values([
        {
          keyExtra: 'eventName',
          valueExtra: createLaunchDto.eventName,
          componentId: phaseEvent[0].insertId,
        },
        {
          keyExtra: 'eventHeadline',
          valueExtra: createLaunchDto.eventHeadline,
          componentId: phaseEvent[0].insertId,
        },
        {
          keyExtra: 'eventDescription',
          valueExtra: createLaunchDto.eventDescription,
          componentId: phaseEvent[0].insertId,
        },
        {
          keyExtra: 'eventStartDate',
          valueExtra: createLaunchDto.dateCpl1,
          componentId: phaseEvent[0].insertId,
        },
        {
          keyExtra: 'eventEndDate',
          valueExtra: createLaunchDto.dateCpl3,
          componentId: phaseEvent[0].insertId,
        },
        {
          keyExtra: 'expertName',
          valueExtra: createLaunchDto.expertName,
          componentId: phaseEvent[0].insertId,
        },

        {
          keyExtra: 'dateCpl1',
          valueExtra: createLaunchDto.dateCpl1,
          componentId: phaseEvent[0].insertId,
        },
        {
          keyExtra: 'cpl1',
          valueExtra: 'https://www.youtube.com/embed/am-FQ86mKV0',
          componentId: phaseEvent[0].insertId,
        },

        {
          keyExtra: 'dateCpl2',
          valueExtra: createLaunchDto.dateCpl2,
          componentId: phaseEvent[0].insertId,
        },
        {
          keyExtra: 'cpl2',
          valueExtra: 'https://www.youtube.com/embed/u-6XK1yy3rE',
          componentId: phaseEvent[0].insertId,
        },

        {
          keyExtra: 'dateCpl3',
          valueExtra: createLaunchDto.dateCpl3,
          componentId: phaseEvent[0].insertId,
        },
        {
          keyExtra: 'cpl3',
          valueExtra: 'https://www.youtube.com/embed/BJYpPfyz3ks',
          componentId: phaseEvent[0].insertId,
        },

        {
          keyExtra: 'eventImg',
          valueExtra: '1671667103392-violaosemstress.png',
          componentId: phaseEvent[0].insertId,
        },
        {
          keyExtra: 'eventGroupLink',
          valueExtra: 'https://evento.violaofeeling.com.br/viawhats/preconexao',
          componentId: phaseEvent[0].insertId,
        },
      ]);

      //################ LEADS ################
      const phaseSale = await this.db.insert(schema.component).values({
        name: 'Vendas',
        description: 'sales-' + createLaunchDto.slug,
        componentId: launch[0].insertId,
      });

      const extrasSale = await this.db.insert(schema.componentExtra).values([
        {
          keyExtra: 'productName',
          valueExtra: createLaunchDto.productName,
          componentId: phaseSale[0].insertId,
        },
        {
          keyExtra: 'productHeadline',
          valueExtra: createLaunchDto.productHeadline,
          componentId: phaseSale[0].insertId,
        },
        {
          keyExtra: 'productDescription',
          valueExtra: createLaunchDto.productDescription,
          componentId: phaseSale[0].insertId,
        },
        {
          keyExtra: 'productBtn',
          valueExtra: 'QUERO ENTRAR NO TREINAMENTO',
          componentId: phaseSale[0].insertId,
        },

        {
          keyExtra: 'productPrice',
          valueExtra: createLaunchDto.productPrice,
          componentId: phaseSale[0].insertId,
        },
        {
          keyExtra: 'productInstallments',
          valueExtra: createLaunchDto.productInstallments,
          componentId: phaseSale[0].insertId,
        },
        {
          keyExtra: 'productVideo',
          valueExtra: createLaunchDto.productVideo,
          componentId: phaseSale[0].insertId,
        },
        {
          keyExtra: 'productDiscount',
          valueExtra: createLaunchDto.productDiscount,
          componentId: phaseSale[0].insertId,
        },
        {
          keyExtra: 'productDiscountText',
          valueExtra: createLaunchDto.productDiscountText,
          componentId: phaseSale[0].insertId,
        },
        {
          keyExtra: 'talktousLink',
          valueExtra: createLaunchDto.talktousLink,
          componentId: phaseSale[0].insertId,
        },

        {
          keyExtra: 'cartOpenDate',
          valueExtra: createLaunchDto.cartOpenDate,
          componentId: phaseSale[0].insertId,
        },
        {
          keyExtra: 'cartCloseDate',
          valueExtra: createLaunchDto.cartCloseDate,
          componentId: phaseSale[0].insertId,
        },
        {
          keyExtra: 'productWaitLink',
          valueExtra: createLaunchDto.productWaitLink,
          componentId: phaseSale[0].insertId,
        },
        //{ keyExtra: 'page_checkout', valueExtra: 'https://pay.kiwify.com.br/fhTQpmR', componentId: phaseSale[0].insertId },
        //{ keyExtra: 'upsell', valueExtra: '0', componentId: phaseSale[0].insertId },
      ]);

      // //console.log('Result', result);
      return await this.db.query.component.findFirst({
        where: eq(schema.component.id, launch[0].insertId),
      });
    });
  }

  async update(id: number, updateComponentDto: UpdateComponentDto) {
    await this.db
      .update(schema.component)
      .set(updateComponentDto)
      .where(eq(schema.component.id, id));

    const component = await this.db.query.component.findFirst({
      where: eq(schema.component.id, id),
      with: { children: true, parent: true, extras: true },
    });

    return component;
  }

  async remove(id: number) {
    const removedComponent = await this.db.query.component.findFirst({
      where: eq(schema.component.id, id),
    });
    await this.db.delete(schema.component).where(eq(schema.component.id, id));
    return removedComponent;
  }
}
