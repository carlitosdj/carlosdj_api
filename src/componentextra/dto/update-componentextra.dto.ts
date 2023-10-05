import { PartialType } from '@nestjs/swagger';
import { CreateComponentextraDto } from './create-componentextra.dto';

export class UpdateComponentextraDto extends PartialType(CreateComponentextraDto) {}
