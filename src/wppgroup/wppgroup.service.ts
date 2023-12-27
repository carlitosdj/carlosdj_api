import { Inject, Injectable } from '@nestjs/common';
import { CreateWppgroupDto } from './dto/create-wppgroup.dto';
import { UpdateWppgroupDto } from './dto/update-wppgroup.dto';
import * as schema from '../_schemas/schema';
import { DB_SERVICE, DbType } from '../drizzle/providers/drizzle.providers';
import { eq } from 'drizzle-orm';

@Injectable()
export class WppgroupService {
  // constructor(private prismaService: PrismaService) {}
  constructor(@Inject(DB_SERVICE) private readonly db: DbType) {}

  async findAll(page: number, take: number) {
    if (page == 0) page = 1;
    const skip = take * (page - 1);

    const data = await this.db.query.wppGroup.findMany({
      limit: take,
      offset: skip,
    });
    return data;
  }

  async findByGroup(camp_id: number, page: number, take: number) {
    if (page == 0) page = 1;
    const skip = take * (page - 1);

    return await this.db.query.wppGroup.findMany({
      where: eq(schema.wppGroup.campId, camp_id),
      limit: take,
      offset: skip,
    });
    // return this.prismaService.wppGroup.findMany({
    //   skip,
    //   take,
    //   where: {
    //     camp_id,
    //   },
    // });
  }

  async findOne(id: number) {
    // return this.prismaService.wppGroup.findFirstOrThrow({
    //   where: { id },
    // });
    return await this.db.query.wppGroup.findFirst({
      where: eq(schema.wppGroup.id, id),
      // with: {
      //   wppgroup: true,
      // },
    });
  }

  async create(createWppgroupDto: CreateWppgroupDto) {
    const date = new Date();

    const newItem = await this.db
      .insert(schema.wppGroup)
      .values(createWppgroupDto);
    return await this.db.query.wppGroup.findFirst({
      where: eq(schema.wppGroup.id, newItem[0].insertId),
    });
    // return this.prismaService.wppGroup.create({
    //   data: { ...createWppgroupDto, created_at: date.getTime() / 1000 },
    // });
  }

  async update(id: number, updateWppgroupDto: UpdateWppgroupDto) {
    // return this.prismaService.wppGroup.update({
    //   where: { id },
    //   data: updateWppgroupDto,
    // });
    await this.db
      .update(schema.wppGroup)
      .set(updateWppgroupDto)
      .where(eq(schema.wppGroup.id, id));

    return await this.db.query.wppGroup.findFirst({
      where: eq(schema.wppGroup.id, id),
    });
  }

  async remove(id: number) {
    // return this.prismaService.wppGroup.delete({ where: { id } });
    const itemRemoved = await this.db.query.wppGroup.findFirst({
      where: eq(schema.wppGroup.id, id),
    });
    await this.db.delete(schema.wppGroup).where(eq(schema.wppGroup.id, id));
    return itemRemoved;
  }
}
