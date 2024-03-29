import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateComponentDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsOptional()
  @IsNumber()
  created_at?: Date | null;

  @IsOptional()
  @IsString()
  status?: string | null;

  @IsOptional()
  @IsString()
  order?: string | null;

  @IsOptional()
  @IsNumber()
  duration?: number | null;

  @IsOptional()
  @IsString()
  tags?: string | null;

  @IsOptional()
  @IsString()
  orderby?: string | null;

  @IsOptional()
  @IsNumber()
  componentId?: number | null;
}
