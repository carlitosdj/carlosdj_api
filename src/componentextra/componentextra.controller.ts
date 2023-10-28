import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComponentextraService } from './componentextra.service';
import { CreateComponentextraDto } from './dto/create-componentextra.dto';
import { UpdateComponentextraDto } from './dto/update-componentextra.dto';

@Controller('componentextra')
export class ComponentextraController {
  constructor(private readonly componentextraService: ComponentextraService) {}

  @Get('all')
  findAll() {
    return this.componentextraService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.componentextraService.findOne(+id);
  }

  @Get('parent/:componentId')
  findByParent(@Param('componentId') componentId: string) {
    return this.componentextraService.findByParent(+componentId);
  }

  @Post()
  create(@Body() createComponentextraDto: CreateComponentextraDto) {
    return this.componentextraService.create(createComponentextraDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComponentextraDto: UpdateComponentextraDto,
  ) {
    return this.componentextraService.update(+id, updateComponentextraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.componentextraService.remove(+id);
  }
}
