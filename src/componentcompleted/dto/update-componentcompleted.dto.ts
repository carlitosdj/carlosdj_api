import { PartialType } from '@nestjs/swagger';
import { CreateComponentcompletedDto } from './create-componentcompleted.dto';

export class UpdateComponentcompletedDto extends PartialType(CreateComponentcompletedDto) {}
