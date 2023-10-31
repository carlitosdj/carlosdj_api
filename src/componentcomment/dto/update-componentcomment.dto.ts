import { PartialType } from '@nestjs/swagger';
import { CreateComponentcommentDto } from './create-componentcomment.dto';

export class UpdateComponentcommentDto extends PartialType(CreateComponentcommentDto) {}
