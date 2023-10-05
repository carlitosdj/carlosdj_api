import { PartialType } from '@nestjs/swagger';
import { CreateLeademailDto } from './create-leademail.dto';

export class UpdateLeademailDto extends PartialType(CreateLeademailDto) {}
