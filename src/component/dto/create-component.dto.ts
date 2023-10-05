import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateComponentDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsNumber()
  created_at: number;
  @IsNumber()
  status: number;

  @IsOptional()
  @IsNumber()
  order?: number | null;

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
  component_id?: number | null;
}
