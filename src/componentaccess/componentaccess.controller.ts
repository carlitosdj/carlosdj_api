import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComponentaccessService } from './componentaccess.service';
import { CreateComponentaccessDto } from './dto/create-componentaccess.dto';
import { UpdateComponentaccessDto } from './dto/update-componentaccess.dto';

@Controller('componentaccess')
export class ComponentaccessController {
  constructor(private readonly componentaccessService: ComponentaccessService) {}

  @Post()
  create(@Body() createComponentaccessDto: CreateComponentaccessDto) {
    return this.componentaccessService.create(createComponentaccessDto);
  }

  @Get()
  findAll() {
    return this.componentaccessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.componentaccessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComponentaccessDto: UpdateComponentaccessDto) {
    return this.componentaccessService.update(+id, updateComponentaccessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.componentaccessService.remove(+id);
  }
}
