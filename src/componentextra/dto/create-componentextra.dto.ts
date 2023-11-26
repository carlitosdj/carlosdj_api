import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateComponentextraDto {
  @IsString()
  keyExtra: string;

  @IsString()
  valueExtra: string;

  @IsOptional()
  @IsNumber()
  created_at?: number | null;

  @IsOptional()
  @IsString()
  status?: string | null;

  @IsNumber()
  componentId: number;
}
