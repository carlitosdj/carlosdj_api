import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WppcampService } from './wppcamp.service';
import { CreateWppcampDto } from './dto/create-wppcamp.dto';
import { UpdateWppcampDto } from './dto/update-wppcamp.dto';

@Controller('wppcamp')
export class WppcampController {
  constructor(private readonly wppcampService: WppcampService) {}

  @Get('all/:page/:take')
  findAll(@Param('page') page: number, @Param('take') take: number) {
    return this.wppcampService.findAll(page, take);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.wppcampService.findOne(+id);
  }

  @Post()
  create(@Body() createWppcampDto: CreateWppcampDto) {
    return this.wppcampService.create(createWppcampDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWppcampDto: UpdateWppcampDto) {
    return this.wppcampService.update(+id, updateWppcampDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wppcampService.remove(+id);
  }
}
