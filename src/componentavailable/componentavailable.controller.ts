import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComponentavailableService } from './componentavailable.service';
import { CreateComponentavailableDto } from './dto/create-componentavailable.dto';
import { UpdateComponentavailableDto } from './dto/update-componentavailable.dto';

@Controller('componentavailable')
export class ComponentavailableController {
  constructor(
    private readonly componentavailableService: ComponentavailableService,
  ) {}

  @Get('all')
  findAll() {
    return this.componentavailableService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.componentavailableService.findOne(+id);
  }

  @Get('parent/:component_id')
  findByParent(@Param('component_id') component_id: string) {
    return this.componentavailableService.findByParent(+component_id);
  }

  @Post()
  create(@Body() createComponentavailableDto: CreateComponentavailableDto) {
    return this.componentavailableService.create(createComponentavailableDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComponentavailableDto: UpdateComponentavailableDto,
  ) {
    return this.componentavailableService.update(
      +id,
      updateComponentavailableDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.componentavailableService.remove(+id);
  }
}
