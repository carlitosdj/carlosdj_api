import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MassmailService } from './massmail.service';
import { CreateMassmailDto } from './dto/create-massmail.dto';
import { UpdateMassmailDto } from './dto/update-massmail.dto';

@Controller('massmail')
export class MassmailController {
  constructor(private readonly massmailService: MassmailService) {}

  @Get('all/:page/:take')
  findAll(@Param('page') page: number, @Param('take') take: number) {
    return this.massmailService.findAll(page, take);
  }

  @Get('list/:list/:page/:take')
  findAllByList(
    @Param('list') list: string,
    @Param('page') page: number,
    @Param('take') take: number,
  ) {
    return this.massmailService.findAllByList(list, page, take);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.massmailService.findOne(+id);
  }

  @Post()
  create(@Body() CreateMassmailDto: CreateMassmailDto) {
    return this.massmailService.create(CreateMassmailDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateMassmailDto: UpdateMassmailDto,
  ) {
    return this.massmailService.update(+id, UpdateMassmailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.massmailService.remove(+id);
  }
}
