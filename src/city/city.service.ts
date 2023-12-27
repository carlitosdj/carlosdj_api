import { Inject, Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { DB_SERVICE, DbType } from '../drizzle/providers/drizzle.providers';
import * as schema from '../_schemas/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class CityService {
  constructor(@Inject(DB_SERVICE) private readonly db: DbType) {}

  create(createCityDto: CreateCityDto) {
    // return this.prismaService.locationCity.create({
    //   data: createCityDto,
    // });
  }

  findAll() {
    // return this.prismaService.locationCity.findMany({
    //   include: { state: true },
    // });
  }

  findOne(id: number) {
    // return this.prismaService.locationCity.findFirstOrThrow({
    //   where: { id },
    //   include: { state: true },
    // });
    
  }

  findCitiesByState(state_id: number) {
    // return this.prismaService.locationCity.findMany({
    //   where: { state_id },
    // });
    return this.db.query.locationCity.findMany({
      where: eq(schema.locationCity.stateId, state_id)
    })
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    // return this.prismaService.locationCity.update({
    //   where: { id },
    //   data: updateCityDto,
    // });
  }

  remove(id: number) {
    // return this.prismaService.locationCity.delete({ where: { id } });
  }
}
