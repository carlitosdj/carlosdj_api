import { Inject, Injectable } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { DB_SERVICE, DbType } from '../drizzle/providers/drizzle.providers';
import * as schema from '../_schemas/schema';

@Injectable()
export class StateService {
  constructor(@Inject(DB_SERVICE) private readonly db: DbType) {}

  findAll() {
    // return this.prismaService.locationState.findMany({});
    return this.db.query.locationState.findMany({})
  }

  findOne(id: number) {
    // return this.prismaService.locationState.findFirstOrThrow({
    //   where: { id },
    //   include: {
    //     City: true,
    //   },
    // });
  }

  create(createStateDto: CreateStateDto) {
    // return this.prismaService.locationState.create({
    //   data: createStateDto,
    // });
  }

  update(id: number, updateStateDto: UpdateStateDto) {
    // return this.prismaService.locationState.update({
    //   where: { id },
    //   data: updateStateDto,
    // });
  }

  remove(id: number) {
    // return this.prismaService.locationState.delete({ where: { id } });
  }
}
