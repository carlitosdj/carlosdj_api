import { PartialType } from '@nestjs/swagger';
import { CreateComponentannotationDto } from './create-componentannotation.dto';

export class UpdateComponentannotationDto extends PartialType(CreateComponentannotationDto) {}
