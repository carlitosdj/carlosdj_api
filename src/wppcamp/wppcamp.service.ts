import { Inject, Injectable } from '@nestjs/common';
import { CreateWppcampDto } from './dto/create-wppcamp.dto';
import { UpdateWppcampDto } from './dto/update-wppcamp.dto';
import { DB_SERVICE, DbType } from '../drizzle/providers/drizzle.providers';
import { and, eq, lt } from 'drizzle-orm';
// import { PrismaService } from 'src/prisma/prisma/prisma.service';
import * as schema from '../_schemas/schema';

@Injectable()
export class WppcampService {
  constructor(@Inject(DB_SERVICE) private readonly db: DbType) {}

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
    // Busca campanha com o slug
    const campaignSearch = await this.db.query.wppCamp.findFirst({
      where: eq(schema.wppCamp.slug, campaign),
    });
    console.log("campaign", campaign)
    console.log('hey', campaignSearch);
    // Grava o maximo de cliques
    const maxclicks = await campaignSearch!.maxclicks;

    // Acha o próximo grupo que está disponível: Less than maxclicks
    const groupavailable = await this.db.query.wppGroup.findFirst({
      where: and(
        lt(schema.wppGroup.clicks, maxclicks),
        eq(schema.wppGroup.campId, campaignSearch.id),
      ),
    });

    console.log("groupavailable", groupavailable)

    // Soma cliques:
    const clicks = await groupavailable.clicks + 1;
    const id = await groupavailable.id;

    // Atualiza cliques:
    const update = await this.db
      .update(schema.wppGroup)
      .set({ clicks })
      .where(eq(schema.wppGroup.id, id));

    return await groupavailable;
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
