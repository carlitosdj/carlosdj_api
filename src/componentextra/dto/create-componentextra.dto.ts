import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateComponentextraDto {
  @IsString()
  key_extra: string;

  @IsString()
  value_extra: string;

  @IsOptional()
  @IsNumber()
  created_at?: number | null;

  @IsOptional()
  @IsNumber()
  status?: number | null;

  @IsNumber()
  component_id: number;
}
