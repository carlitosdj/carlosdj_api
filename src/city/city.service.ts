import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
//import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class CityService {
  //constructor(private prismaService: PrismaService) {}

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
