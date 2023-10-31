import { Inject, Injectable } from '@nestjs/common';
import { CreateWppcampDto } from './dto/create-wppcamp.dto';
import { UpdateWppcampDto } from './dto/update-wppcamp.dto';
import { DB, DbType } from 'src/drizzle/providers/drizzle.providers';
import { and, eq, lt } from 'drizzle-orm';
// import { PrismaService } from 'src/prisma/prisma/prisma.service';
import * as schema from '../_schemas/schema';

@Injectable()
export class WppcampService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async findAll(page: number, take: number) {
    if (page == 0) page = 1;
    const skip = take * (page - 1);

    const data = await this.db.query.wppCamp.findMany({
      limit: take,
      offset: skip,
    });

    // return {
    //   data,
    //   count: data.length,
    // };

    return data;
  }

  async findOne(id: number) {
    return await this.db.query.wppCamp.findFirst({
      where: eq(schema.wppCamp.id, id),
      with: {
        wppgroup: true,
      },
    });
  }

  async findGroupAvailable(campaign: string) {
    // //Busca campanha com o slug
    const campaignSearch = await this.db.query.wppCamp.findFirst({
      where: eq(schema.wppCamp.slug, campaign),
    });

    // const campaignSearch = await this.prismaService.wppCamp.findFirstOrThrow({
    //   where: {
    //     slug: campaign,
    //   },
    // });
    // console.log('Campanha', campaign);

    // //Grava o maximo de cliques
    const maxclicks = campaignSearch!.maxclicks;

    // //Acha o próximo grupo que está disponível: Less than maxclicks
    const groupavailable = await this.db.query.wppGroup.findFirst({
      where: and(
        lt(schema.wppGroup.clicks, maxclicks),
        eq(schema.wppGroup.campId, campaignSearch.id),
      ),
    });
    // const groupavailable = await this.prismaService.wppGroup.findFirstOrThrow({
    //   where: {
    //     AND: [
    //       {
    //         clicks: {
    //           lt: maxclicks, //less than
    //         },
    //         camp_id: campaignSearch!.id,
    //       },
    //     ],
    //   },
    // });

    // //Soma cliques:
    const clicks = groupavailable.clicks + 1;
    const id = groupavailable.id;
    // //console.log('clicks', clicks);
    // //console.log('id', id);

    // Atualiza cliques:
    const update = this.db
      .update(schema.wppGroup)
      .set({ clicks })
      .where(eq(schema.wppGroup.id, id));
    // return this.db.query.wppGroup.findFirst({
    //   where: eq(schema.wppGroup.id, id)
    // })

    return groupavailable;
    // return await this.prismaService.wppGroup.update({
    //   where: { id },
    //   data: { clicks },
    // });
    // // console.log('GROUP AVAILABLE', groupavailable);
    // // return groupavailable;
  }

  async create(createWppcampDto: CreateWppcampDto) {
    const newItem = await this.db
      .insert(schema.wppCamp)
      .values(createWppcampDto);
    return await this.db.query.wppCamp.findFirst({
      where: eq(schema.wppCamp.id, newItem[0].insertId),
    });
    // return this.prismaService.wppCamp.create({
    //   data: createWppcampDto,
    // });
  }

  async update(id: number, updateWppcampDto: UpdateWppcampDto) {

    await this.db
      .update(schema.wppCamp)
      .set(updateWppcampDto)
      .where(eq(schema.wppCamp.id, id));

    return await this.db.query.wppCamp.findFirst({
      where: eq(schema.wppCamp.id, id),
    });
    // return this.prismaService.wppCamp.update({
    //   where: { id },
    //   data: updateWppcampDto,
    // });
  }

  async remove(id: number) {
    const itemRemoved = await this.db.query.wppCamp.findFirst({
      where: eq(schema.wppCamp.id, id),
    });
    await this.db.delete(schema.wppCamp).where(eq(schema.wppCamp.id, id));
    return itemRemoved;
    // return this.prismaService.wppCamp.delete({ where: { id } });
  }
}
