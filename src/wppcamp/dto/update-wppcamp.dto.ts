import { PartialType } from '@nestjs/swagger';
import { CreateWppcampDto } from './create-wppcamp.dto';

export class UpdateWppcampDto extends PartialType(CreateWppcampDto) {}
