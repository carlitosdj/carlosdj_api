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

@Controller('componentcompleted')
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

  @Get('parent/:component_id')
  findByParent(@Param('component_id') component_id: string) {
    return this.componentcompletedService.findByParent(+component_id);
  }

  @Post()
  create(@Body() createComponentcompletedDto: CreateComponentcompletedDto) {
    return this.componentcompletedService.create(createComponentcompletedDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComponentcompletedDto: UpdateComponentcompletedDto,
  ) {
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
