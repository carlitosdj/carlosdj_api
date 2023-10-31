import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComponentcommentService } from './componentcomment.service';
import { CreateComponentcommentDto } from './dto/create-componentcomment.dto';
import { UpdateComponentcommentDto } from './dto/update-componentcomment.dto';

@Controller('componentcomment')
export class ComponentcommentController {
  constructor(private readonly componentcommentService: ComponentcommentService) {}

  @Post()
  create(@Body() createComponentcommentDto: CreateComponentcommentDto) {
    return this.componentcommentService.create(createComponentcommentDto);
  }

  @Get()
  findAll() {
    return this.componentcommentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.componentcommentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComponentcommentDto: UpdateComponentcommentDto) {
    return this.componentcommentService.update(+id, updateComponentcommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.componentcommentService.remove(+id);
  }
}
