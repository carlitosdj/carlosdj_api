import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LeademailService } from './leademail.service';
import { CreateLeademailDto } from './dto/create-leademail.dto';
import { UpdateLeademailDto } from './dto/update-leademail.dto';

@Controller('leademail')
export class LeademailController {
  constructor(private readonly leademailService: LeademailService) {}

  @Get('all/:page/:take')
  findAll(@Param('page') page: number, @Param('take') take: number) {
    return this.leademailService.findAll(page, take);
  }

  @Get('list/:list/:page/:take')
  findAllByList(
    @Param('list') list: string,
    @Param('page') page: number,
    @Param('take') take: number,
  ) {
    return this.leademailService.findAllByList(list, page, take);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.leademailService.findOne(+id);
  }

  @Post()
  create(@Body() createLeademailDto: CreateLeademailDto) {
    return this.leademailService.create(createLeademailDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLeademailDto: UpdateLeademailDto,
  ) {
    return this.leademailService.update(+id, updateLeademailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leademailService.remove(+id);
  }
}
