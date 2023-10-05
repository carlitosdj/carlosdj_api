import { PartialType } from '@nestjs/swagger';
import { CreateWppgroupDto } from './create-wppgroup.dto';

export class UpdateWppgroupDto extends PartialType(CreateWppgroupDto) {}
