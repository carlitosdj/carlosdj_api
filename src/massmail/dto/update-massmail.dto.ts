import { PartialType } from '@nestjs/swagger';
import { CreateMassmailDto } from './create-massmail.dto';

export class UpdateMassmailDto extends PartialType(CreateMassmailDto) {}
