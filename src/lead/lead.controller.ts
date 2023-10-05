import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LeadService } from './lead.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Get('all/:page/:take')
  findAll(@Param('page') page: number, @Param('take') take: number) {
    return this.leadService.findAll(page, take);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.leadService.findOne(+id);
  }

  @Get('search/:search')
  searchLeads(@Param('search') search: string) {
    return this.leadService.searchLeads(search);
  }

  @Get('list/:list')
  searchByList(@Param('list') list: string) {
    return this.leadService.searchByList(list);
  }

  @Get('load/:list/:email')
  loadLead(@Param('list') list: string, @Param('email') email: string) {
    return this.leadService.loadLead(list, email);
  }

  @Get('confirm/:list/:email')
  confirm(@Param('list') list: string, @Param('email') email: string) {
    return this.leadService.confirm(list, email);
  }

  @Get('notdisturb/:list/:email')
  notdisturb(@Param('list') list: string, @Param('email') email: string) {
    return this.leadService.notdisturb(list, email);
  }

  @Post()
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadService.create(createLeadDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadService.update(+id, updateLeadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadService.remove(+id);
  }
}
