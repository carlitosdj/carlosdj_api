import { Inject, Injectable } from '@nestjs/common';
import { CreateSupportDto } from './dto/create-support.dto';
import { UpdateSupportDto } from './dto/update-support.dto';
import * as schema from '../_schemas/schema';
import { DB, DbType } from 'src/drizzle/providers/drizzle.providers';
import { eq } from 'drizzle-orm';

@Injectable()
export class SupportService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  findAll() {
    return this.db.query.support.findMany({
      with: {
        parentUser: true,
        parentAdmin: true,
      }
    })
  }

  findOne(id: number) {
    return this.db.query.support.findFirst({
      where: eq(schema.support.id, id)
    })
  }

  async create(createSupportDto: CreateSupportDto) {
    const newItem = await this.db
      .insert(schema.support)
      .values(createSupportDto);

    return await this.db.query.support.findFirst({
      where: eq(schema.support.id, newItem[0].insertId),
    });
  }

  async update(id: number, updateSupportDto: UpdateSupportDto) {
    await this.db
      .update(schema.support)
      .set(updateSupportDto)
      .where(eq(schema.support.id, id));

    return await this.db.query.support.findFirst({
      where: eq(schema.support.id, id),
    });
  }

  async remove(id: number) {
    const itemRemoved = await this.db.query.support.findFirst({
      where: eq(schema.support.id, id),
    });
    await this.db.delete(schema.support).where(eq(schema.support.id, id))
    return itemRemoved;
  }
}
