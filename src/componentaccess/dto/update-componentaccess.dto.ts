import { PartialType } from '@nestjs/swagger';
import { CreateComponentaccessDto } from './create-componentaccess.dto';

export class UpdateComponentaccessDto extends PartialType(CreateComponentaccessDto) {}
