import { Inject, Injectable } from '@nestjs/common';
import { CreateComponentextraDto } from './dto/create-componentextra.dto';
import { UpdateComponentextraDto } from './dto/update-componentextra.dto';
import { DB, DbType } from 'src/drizzle/providers/drizzle.providers';
import { eq } from 'drizzle-orm';
import * as schema from '../_schemas/schema';
// import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class ComponentextraService {
  constructor(@Inject(DB) private readonly db: DbType) {}
  // constructor(private prismaService: PrismaService) {}

  findAll() {
    // return this.prismaService.componentExtra.findMany();
    return this.db.query.componentExtra.findMany()
  }

  findOne(id: number) {
    return this.db.query.componentExtra.findFirst({
      where: eq(schema.componentExtra.id, id)
    })
    // return this.prismaService.componentExtra.findFirstOrThrow({
    //   where: { id },
    // });
  }

  findByParent(componentId: number) {
    return this.db.query.componentExtra.findMany({
      where: eq(schema.componentExtra.componentId, componentId)
    })
    // return this.prismaService.componentExtra.findMany({
    //   where: { componentId },
    // });
  }

  async create(createComponentextraDto: CreateComponentextraDto) {

    const newItem = await this.db
      .insert(schema.componentExtra)
      .values(createComponentextraDto);
    return await this.db.query.componentExtra.findFirst({
      where: eq(schema.componentExtra.id, newItem[0].insertId),
    });

    // const date = new Date();
    // return this.prismaService.componentExtra.create({
    //   data: {
    //     ...createComponentextraDto,
    //     created_at: date.getTime() / 1000,
    //   },
    // });
  }

  async update(id: number, updateComponentextraDto: UpdateComponentextraDto) {
    // return this.prismaService.componentExtra.update({
    //   where: { id },
    //   data: updateComponentextraDto,
    // });
    //update item
    await this.db
      .update(schema.componentExtra)
      .set(updateComponentextraDto)
      .where(eq(schema.componentExtra.id, id));

    return await this.db.query.componentExtra.findFirst({
      where: eq(schema.componentExtra.id, id),
    });
  }

  async remove(id: number) {
    const itemRemoved = await this.db.query.componentExtra.findFirst({
      where: eq(schema.componentExtra.id, id),
    });
    await this.db.delete(schema.componentExtra).where(eq(schema.componentExtra.id, id))
    return itemRemoved;
    // return this.prismaService.componentExtra.delete({ where: { id } });
  }
}
