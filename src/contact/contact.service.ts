import { Inject, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import * as schema from '../_schemas/schema';
import { DB, DbType } from 'src/drizzle/providers/drizzle.providers';
import { eq } from 'drizzle-orm';

@Injectable()
export class ContactService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  findAll() {
    return this.db.query.contact.findMany()
  }

  findOne(id: number) {
    return this.db.query.contact.findFirst({
      where: eq(schema.contact.id, id)
    })
  }

  async create(createContactDto: CreateContactDto) {
    const newItem = await this.db
      .insert(schema.contact)
      .values(createContactDto);

    return await this.db.query.contact.findFirst({
      where: eq(schema.contact.id, newItem[0].insertId),
    });
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    await this.db
      .update(schema.contact)
      .set(updateContactDto)
      .where(eq(schema.contact.id, id));

    return await this.db.query.contact.findFirst({
      where: eq(schema.contact.id, id),
    });
  }

  async remove(id: number) {
    const itemRemoved = await this.db.query.contact.findFirst({
      where: eq(schema.contact.id, id),
    });
    await this.db.delete(schema.contact).where(eq(schema.contact.id, id))
    return itemRemoved;
  }
}
