import { Inject, Injectable } from '@nestjs/common';
import { CreateComponentannotationDto } from './dto/create-componentannotation.dto';
import { UpdateComponentannotationDto } from './dto/update-componentannotation.dto';
import * as schema from '../_schemas/schema';
import { DB_SERVICE, DbType } from '../drizzle/providers/drizzle.providers';
import { and, desc, eq } from 'drizzle-orm';

@Injectable()
export class ComponentannotationService {
  constructor(@Inject(DB_SERVICE) private readonly db: DbType) {}

  findAll() {
    return this.db.query.componentAnnotation.findMany({
      //where: eq(schema.componentAnnotation.userId, userId),
      with: {
        parentComponent: {
          with: {
            parent: {
              with: {
                parent: true
              }
            }
          },
        },
        parentUser: true,
      },
      orderBy: desc(schema.componentAnnotation.id)
    });
    //return `This action returns all componentannotation`;
  }

  findAllFromUser(userId: number) {
    return this.db.query.componentAnnotation.findMany({
      where: eq(schema.componentAnnotation.userId, userId),
      with: {
        parentComponent: {
          with: {
            parent: {
              with: {
                parent: true
              }
            }
          },
        },
        //parentUser: true,
      },
      orderBy: desc(schema.componentAnnotation.id)
    });
    //return `This action returns all componentannotation`;
  }

  findOne(userId: number, componentId: number) {
    return this.db.query.componentAnnotation.findFirst({
      where: and(
        eq(schema.componentAnnotation.userId, userId),
        eq(schema.componentAnnotation.componentId, componentId),
      ),
    });
    //return `This action returns a #${id} componentannotation`;
  }

  async create(createComponentannotationDto: CreateComponentannotationDto) {
    const newItem = await this.db
      .insert(schema.componentAnnotation)
      .values(createComponentannotationDto);

    return await this.db.query.componentAnnotation.findFirst({
      where: eq(schema.componentAnnotation.id, newItem[0].insertId),
    });
    //return 'This action adds a new componentannotation';
  }

  async update(
    id: number,
    updateComponentannotationDto: UpdateComponentannotationDto,
  ) {
    await this.db
      .update(schema.componentAnnotation)
      .set(updateComponentannotationDto)
      .where(eq(schema.componentAnnotation.id, id));

    return await this.db.query.componentAnnotation.findFirst({
      where: eq(schema.componentAnnotation.id, id),
    });

    //return `This action updates a #${id} componentannotation`;
  }

  async remove(id: number) {
    const itemRemoved = await this.db.query.componentAnnotation.findFirst({
      where: eq(schema.componentAnnotation.id, id),
    });
    await this.db
      .delete(schema.componentAnnotation)
      .where(eq(schema.componentAnnotation.id, id));
    return itemRemoved;
    //return `This action removes a #${id} componentannotation`;
  }
}
