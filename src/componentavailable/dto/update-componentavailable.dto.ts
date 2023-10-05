import { PartialType } from '@nestjs/swagger';
import { CreateComponentavailableDto } from './create-componentavailable.dto';

export class UpdateComponentavailableDto extends PartialType(CreateComponentavailableDto) {}
