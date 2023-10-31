import { Inject, Injectable } from '@nestjs/common';
import { CreateComponentcommentDto } from './dto/create-componentcomment.dto';
import { UpdateComponentcommentDto } from './dto/update-componentcomment.dto';
import * as schema from '../_schemas/schema';
import { DB, DbType } from 'src/drizzle/providers/drizzle.providers';
import { eq } from 'drizzle-orm';

@Injectable()
export class ComponentcommentService {

  constructor(@Inject(DB) private readonly db: DbType) {}

  findAll() {
    return this.db.query.componentComment.findMany()
    //return `This action returns all componentcomment`;
  }

  findOne(id: number) {
    return this.db.query.componentComment.findFirst({
      where: eq(schema.componentComment.id, id)
    })
    //return `This action returns a #${id} componentcomment`;
  }

  async create(createComponentcommentDto: CreateComponentcommentDto) {
    const newItem = await this.db
      .insert(schema.componentComment)
      .values(createComponentcommentDto);

    return await this.db.query.componentComment.findFirst({
      where: eq(schema.componentComment.id, newItem[0].insertId),
    });
    //return 'This action adds a new componentcomment';
  }

  async update(id: number, updateComponentcommentDto: UpdateComponentcommentDto) {
    await this.db
      .update(schema.componentComment)
      .set(updateComponentcommentDto)
      .where(eq(schema.componentComment.id, id));

    return await this.db.query.componentComment.findFirst({
      where: eq(schema.componentComment.id, id),
    });
    //return `This action updates a #${id} componentcomment`;
  }

  async remove(id: number) {
    const itemRemoved = await this.db.query.componentComment.findFirst({
      where: eq(schema.componentComment.id, id),
    });
    await this.db.delete(schema.componentComment).where(eq(schema.componentComment.id, id))
    return itemRemoved;
    //return `This action removes a #${id} componentcomment`;
  }
}
