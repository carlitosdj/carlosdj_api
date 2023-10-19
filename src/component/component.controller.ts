import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComponentService } from './component.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { SkipAuth } from 'src/auth/auth.public.decorator';
import { Prisma } from '@prisma/client';

@Controller('component')
export class ComponentController {
  constructor(private readonly componentService: ComponentService) {}

  @Get('all/:page/:take')
  findAll(@Param('page') page: number, @Param('take') take: number) {
    return this.componentService.findAll(page, take);
  }

  @Get('id/:id/:sort')
  findOne(@Param('id') id: string, @Param('sort') sort: Prisma.SortOrder) {
    return this.componentService.findOne(+id, sort);
  }

  @Get('search/:search')
  searchComponent(@Param('search') search: string) {
    return this.componentService.searchComponent(search);
  }

  //Usado no marketing
  @SkipAuth()
  @Get('description/:search')
  searchByDescription(@Param('search') search: string) {
    return this.componentService.searchByDescription(search);
  }

  @Get('modules/:id/:user_id/:num_turma/:orderby')
  findModules(
    @Param('id') id: string,
    @Param('user_id') user_id: string,
    @Param('num_turma') num_turma: string,
    @Param('orderby') orderby: Prisma.SortOrder,
  ) {
    return this.componentService.findModules(+id, +user_id, num_turma, orderby);
  }

  @Get('classes/:id/:user_id/:orderby')
  findClasses(
    @Param('id') id: string,
    @Param('user_id') user_id: string,
    @Param('orderby') orderby: Prisma.SortOrder,
  ) {
    return this.componentService.findClasses(+id, +user_id, orderby);
  }

  @Get('lastliveclass')
  findLastLiveClass() {
    return this.componentService.findLastLiveClass();
  }

  @Get('lastclassattended/:user_id')
  findLastClassAttended(@Param('user_id') user_id: string) {
    return this.componentService.findLastClassAttended(+user_id);
  }

  @Post()
  create(@Body() createComponentDto: CreateComponentDto) {
    return this.componentService.create(createComponentDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComponentDto: UpdateComponentDto,
  ) {
    return this.componentService.update(+id, updateComponentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.componentService.remove(+id);
  }
}
