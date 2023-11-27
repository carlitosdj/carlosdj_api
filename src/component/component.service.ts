import { Inject, Injectable } from '@nestjs/common';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
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

    console.log('FIND CLASSES componentId', id);
    console.log('FIND CLASSES user_id', user_id);

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

  async findLastClassAttended(user_id: number) {
    // return await this.prismaService.component.findFirstOrThrow({
    //   where: { ComponentCompleted: { some: { user_id } } },
    //   orderBy: { id: 'desc' },
    //   include: { children: true, parent: true, extras: true },
    // });

    const lastCompleted = await this.db.query.componentCompleted.findFirst({
      where: eq(schema.componentCompleted.userId, user_id),
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

    console.log('USERID', user_id);
    return await this.db.query.component.findFirst({
      with: {
        completed: {
          where: eq(schema.componentCompleted.userId, user_id),
          //orderBy: asc(schema.componentCompleted.updatedAt)
        },
        //extras: true,
        //parent: true,
        //children:true,
        // // children: {
        // //   with: {
        // //     extras: true,
        // //     available: true,
        // //   },
        // // },
      },
      //where: eq(schema.componentCompleted.userId, user_id)
      //where:
      //where: eq(schema.)
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

  async createLaunch(createComponentDto: CreateComponentDto) {
    // const newItem = await this.db
    //   .insert(schema.component)
    //   .values(createComponentDto);
    // return await this.db.query.component.findFirst({
    //   where: eq(schema.component.id, newItem[0].insertId),
    // });
    return await this.db.transaction(async (tx) => {
      const launch = await this.db
        .insert(schema.component)
        .values(createComponentDto);

      //################ LEADS ################
      const phaseLeads = await this.db.insert(schema.component).values({
        name: 'Captação de lead',
        description: 'lead-' + createComponentDto.name,
        componentId: launch[0].insertId,
      });

      const extrasLeads = await this.db.insert(schema.componentExtra).values([
        { keyExtra: 'name', valueExtra: 'Do zero a primeira venda online', componentId: phaseLeads[0].insertId },
        { keyExtra: 'headline', valueExtra: 'As 10 Maneiras de vender online em 2023. Evento Online e Gratuito.', componentId: phaseLeads[0].insertId },
        { keyExtra: 'description', valueExtra: 'Aprenda o passo a passo para a atração de clientes em potencial para seu negócio. O evento acontece no dia 08/09/2023 às 20h.', componentId: phaseLeads[0].insertId },
        { keyExtra: 'data_inicio', valueExtra: '30/05/2023', componentId: phaseLeads[0].insertId },
        { keyExtra: 'data_fim', valueExtra: '30/11/2023', componentId: phaseLeads[0].insertId },
        { keyExtra: 'inscricao_inicio', valueExtra: '07/04/2023', componentId: phaseLeads[0].insertId },
        { keyExtra: 'inscricao_fim', valueExtra: '30/11/2023', componentId: phaseLeads[0].insertId },
        { keyExtra: 'btn', valueExtra: 'Quero participar do Zero a Primeira Venda Online', componentId: phaseLeads[0].insertId },
        { keyExtra: 'group_link', valueExtra: 'http://localhost:3015/viawhats/campanha-teste', componentId: phaseLeads[0].insertId },
        { keyExtra: 'img', valueExtra: '1686071778354-Logo-preconexao.png', componentId: phaseLeads[0].insertId },
      ]);

      //################ LEADS ################
      const phaseEvent = await this.db.insert(schema.component).values({
        name: 'Evento',
        description: 'event-' + createComponentDto.name,
        componentId: launch[0].insertId,
      });

      const extrasEvent = await this.db.insert(schema.componentExtra).values([
        { keyExtra: 'data_inicio', valueExtra: '30/05/2023', componentId: phaseEvent[0].insertId },
        { keyExtra: 'data_fim', valueExtra: '30/11/2023', componentId: phaseEvent[0].insertId },
        { keyExtra: 'data_cpl1', valueExtra: '30/05/2023', componentId: phaseEvent[0].insertId },
        { keyExtra: 'data_cpl2', valueExtra: '01/06/2023', componentId: phaseEvent[0].insertId },
        { keyExtra: 'data_cpl3', valueExtra: '03/06/2023', componentId: phaseEvent[0].insertId },
        { keyExtra: 'data_cpl4', valueExtra: '06/06/2023', componentId: phaseEvent[0].insertId },
        { keyExtra: 'cpl1', valueExtra: 'https://www.youtube.com/embed/am-FQ86mKV0', componentId: phaseEvent[0].insertId },
        { keyExtra: 'cpl2', valueExtra: 'https://www.youtube.com/embed/u-6XK1yy3rE', componentId: phaseEvent[0].insertId },
        { keyExtra: 'cpl3', valueExtra: 'https://www.youtube.com/embed/BJYpPfyz3ks', componentId: phaseEvent[0].insertId },
        { keyExtra: 'cpl4', valueExtra: 'https://player.vimeo.com/video/786710754?h=1dd52c4690', componentId: phaseEvent[0].insertId },
        { keyExtra: 'img', valueExtra: '1671667103392-violaosemstress.png', componentId: phaseEvent[0].insertId },
        { keyExtra: 'link_grupo', valueExtra: 'https://evento.violaofeeling.com.br/viawhats/preconexao', componentId: phaseEvent[0].insertId },
      ]);

      //################ LEADS ################
      const phaseSale = await this.db.insert(schema.component).values({
        name: 'Vendas',
        description: 'sales-' + createComponentDto.name,
        componentId: launch[0].insertId,
      });

      const extrasSale = await this.db.insert(schema.componentExtra).values([
        { keyExtra: 'data_inicio', valueExtra: '06/06/2023 13:48', componentId: phaseSale[0].insertId },
        { keyExtra: 'data_fim', valueExtra: '30/11/2023 23:59', componentId: phaseSale[0].insertId },
        { keyExtra: 'num_turma', valueExtra: '10', componentId: phaseSale[0].insertId },
        { keyExtra: 'page_checkout', valueExtra: 'https://pay.kiwify.com.br/fhTQpmR', componentId: phaseSale[0].insertId },
        { keyExtra: 'video_url', valueExtra: 'https://player.vimeo.com/video/786710754', componentId: phaseSale[0].insertId },
        { keyExtra: 'preco', valueExtra: '12x R$79,90', componentId: phaseSale[0].insertId },
        { keyExtra: 'desconto', valueExtra: '1', componentId: phaseSale[0].insertId },
        { keyExtra: 'link_faleconosco', valueExtra: 'https://api.whatsapp.com/send?phone=5534992301304&text=Ol%C3%A1%2C%20tenho%20d%C3%BAvidas%20sobre%20o%20treinamento%20Viol%C3%A3o%20Feeling', componentId: phaseSale[0].insertId },
        { keyExtra: 'texto_desconto', valueExtra: 'De R$ 1299,00 por 12x R$ 79,90 (38% de desconto)', componentId: phaseSale[0].insertId },
        { keyExtra: 'upsell', valueExtra: '0', componentId: phaseSale[0].insertId },
        { keyExtra: 'link_grupo_espera', valueExtra: 'https://evento.violaofeeling.com.br/viawhats/espera', componentId: phaseSale[0].insertId },
      ]);

      //console.log('Result', result);
      return launch;
    });
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
    await this.db.delete(schema.component).where(eq(schema.component.id, id));
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
