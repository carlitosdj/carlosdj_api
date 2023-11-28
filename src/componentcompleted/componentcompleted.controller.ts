import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComponentcompletedService } from './componentcompleted.service';
import { CreateComponentcompletedDto } from './dto/create-componentcompleted.dto';
import { UpdateComponentcompletedDto } from './dto/update-componentcompleted.dto';

@Controller('completed')
export class ComponentcompletedController {
  constructor(
    private readonly componentcompletedService: ComponentcompletedService,
  ) {}

  @Get('all')
  findAll() {
    return this.componentcompletedService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.componentcompletedService.findOne(+id);
  }

  @Get('parent/:componentId')
  findByParent(@Param('componentId') componentId: string) {
    return this.componentcompletedService.findByParent(+componentId);
  }

  @Post()
  create(@Body() createComponentcompletedDto: CreateComponentcompletedDto) {
    // console.log("Create called", createComponentcompletedDto)
    return this.componentcompletedService.create(createComponentcompletedDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComponentcompletedDto: UpdateComponentcompletedDto,
  ) {
    // console.log("Update called", updateComponentcompletedDto)
    return this.componentcompletedService.update(
      +id,
      updateComponentcompletedDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.componentcompletedService.remove(+id);
  }
}
