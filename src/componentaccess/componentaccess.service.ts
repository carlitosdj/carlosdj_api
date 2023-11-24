import { Inject, Injectable } from '@nestjs/common';
import { CreateComponentaccessDto } from './dto/create-componentaccess.dto';
import { UpdateComponentaccessDto } from './dto/update-componentaccess.dto';
import { DB, DbType } from 'src/drizzle/providers/drizzle.providers';
import * as schema from '../_schemas/schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class ComponentaccessService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async create(createComponentaccessDto: CreateComponentaccessDto) {
    const newItem = await this.db
      .insert(schema.componentAccess)
      .values(createComponentaccessDto)
      .onDuplicateKeyUpdate({
        set: {
          status: createComponentaccessDto.status,
        },
      });

    console.log('NEWITEM', newItem);
    if (newItem[0].insertId) {
      return await this.db.query.componentAccess.findFirst({
        where: eq(schema.componentAccess.id, newItem[0].insertId),
      });
    } else {
      return await this.db.query.componentAccess.findFirst({
        where: and(
          eq(schema.componentAccess.userId, createComponentaccessDto.userId),
          eq(
            schema.componentAccess.componentId,
            createComponentaccessDto.componentId,
          ),
        ),
      });
    }
  }

  findAll() {
    return `This action returns all componentaccess`;
  }

  findOne(id: number) {
    return `This action returns a #${id} componentaccess`;
  }

  async update(id: number, updateComponentaccessDto: UpdateComponentaccessDto) {
    console.log('id', id);
    console.log('updateComponentaccessDto', updateComponentaccessDto);
    const teste = await this.db
      .update(schema.componentAccess)
      .set(updateComponentaccessDto)
      .where(eq(schema.componentAccess.id, id));
    console.log('teste', teste);

    return await this.db.query.componentAccess.findFirst({
      where: eq(schema.componentAccess.id, id),
    });
  }

  async remove(id: number) {
    return `This action removes a #${id} componentaccess`;
  }
}
