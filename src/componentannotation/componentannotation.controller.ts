import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComponentannotationService } from './componentannotation.service';
import { CreateComponentannotationDto } from './dto/create-componentannotation.dto';
import { UpdateComponentannotationDto } from './dto/update-componentannotation.dto';

@Controller('componentannotation')
export class ComponentannotationController {
  constructor(private readonly componentannotationService: ComponentannotationService) {}

  @Post()
  create(@Body() createComponentannotationDto: CreateComponentannotationDto) {
    return this.componentannotationService.create(createComponentannotationDto);
  }

  @Get()
  findAll() {
    return this.componentannotationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.componentannotationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComponentannotationDto: UpdateComponentannotationDto) {
    return this.componentannotationService.update(+id, updateComponentannotationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.componentannotationService.remove(+id);
  }
}
