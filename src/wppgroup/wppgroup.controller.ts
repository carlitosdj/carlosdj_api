import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WppgroupService } from './wppgroup.service';
import { CreateWppgroupDto } from './dto/create-wppgroup.dto';
import { UpdateWppgroupDto } from './dto/update-wppgroup.dto';

@Controller('wppgroup')
export class WppgroupController {
  constructor(private readonly wppgroupService: WppgroupService) {}

  @Post()
  create(@Body() createWppgroupDto: CreateWppgroupDto) {
    return this.wppgroupService.create(createWppgroupDto);
  }

  @Get('all/:page/:take')
  findAll(@Param('page') page: number, @Param('take') take: number) {
    return this.wppgroupService.findAll(page, take);
  }

  @Get('camp_id/:camp_id/:page/:take')
  findByGroup(
    @Param('camp_id') camp_id: number,
    @Param('page') page: number,
    @Param('take') take: number,
  ) {
    return this.wppgroupService.findByGroup(camp_id, page, take);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.wppgroupService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWppgroupDto: UpdateWppgroupDto,
  ) {
    return this.wppgroupService.update(+id, updateWppgroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wppgroupService.remove(+id);
  }
}
