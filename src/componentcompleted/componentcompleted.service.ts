import { Inject, Injectable } from '@nestjs/common';
import { CreateComponentcompletedDto } from './dto/create-componentcompleted.dto';
import { UpdateComponentcompletedDto } from './dto/update-componentcompleted.dto';
// import { PrismaService } from 'src/prisma/prisma/prisma.service';
import * as schema from '../_schemas/schema';
import { DB, DbType } from 'src/drizzle/providers/drizzle.providers';
import { eq } from 'drizzle-orm';

@Injectable()
export class ComponentcompletedService {
  // constructor(private prismaService: PrismaService) {}
  constructor(@Inject(DB) private readonly db: DbType) {}

  findAll() {
    // //return `This action returns all componentcompleted`;
    // return this.prismaService.componentCompleted.findMany();
  }

  findOne(id: number) {
    // return this.prismaService.componentCompleted.findFirstOrThrow({
    //   where: { id },
    // });
  }

  findByParent(componentId: number) {
    // return this.prismaService.componentCompleted.findMany({
    //   where: { componentId },
    // });
  }

  async create(createComponentcompletedDto: CreateComponentcompletedDto) {
    //const date = new Date();
    // return this.prismaService.componentCompleted.create({
    //   data: {
    //     ...createComponentcompletedDto,
    //     created_at: date.getTime() / 1000,
    //   },
    // });
    const newItem = await this.db
      .insert(schema.componentCompleted)
      .values(createComponentcompletedDto);
    
    return await this.db.query.componentCompleted.findFirst({
      where: eq(schema.componentCompleted.id, newItem[0].insertId),
    });
  }

  async update(
    id: number,
    updateComponentcompletedDto: UpdateComponentcompletedDto,
  ) {
    console.log('id', id);
    console.log('updateComponentcompletedDto', updateComponentcompletedDto);
    const teste = await this.db
      .update(schema.componentCompleted)
      .set(updateComponentcompletedDto)
      .where(eq(schema.componentCompleted.id, id));
    console.log('teste', teste);
    
    return await this.db.query.componentCompleted.findFirst({
      where: eq(schema.componentCompleted.id, id),
    });
  }

  remove(id: number) {
    // //return `This action removes a #${id} componentcompleted`;
    // return this.prismaService.componentCompleted.delete({ where: { id } });
  }
}
