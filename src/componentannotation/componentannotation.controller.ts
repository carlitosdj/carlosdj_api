import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComponentannotationService } from './componentannotation.service';
import { CreateComponentannotationDto } from './dto/create-componentannotation.dto';
import { UpdateComponentannotationDto } from './dto/update-componentannotation.dto';

@Controller('annotation')
export class ComponentannotationController {
  constructor(
    private readonly componentannotationService: ComponentannotationService,
  ) {}

  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    return this.componentannotationService.findAll(+userId);
  }

  @Get(':userId/:componentId')
  findOne(
    @Param('userId') userId: string,
    @Param('componentId') componentId: string,
  ) {
    return this.componentannotationService.findOne(+userId, +componentId);
  }

  @Post()
  create(@Body() createComponentannotationDto: CreateComponentannotationDto) {
    console.log('CREATING...');
    console.log('BODY', createComponentannotationDto);
    return this.componentannotationService.create(createComponentannotationDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComponentannotationDto: UpdateComponentannotationDto,
  ) {
    console.log('PATCHING...', id);
    console.log('BODY', updateComponentannotationDto);
    return this.componentannotationService.update(
      +id,
      updateComponentannotationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.componentannotationService.remove(+id);
  }
}
