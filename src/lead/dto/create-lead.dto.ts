import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  whatsapp?: string | null;

  @IsString()
  @IsOptional()
  list?: string | null;

  @IsNumber()
  @IsOptional()
  confirm?: number | null;

  @IsString()
  @IsOptional()
  segmentacao?: string | null;

  @IsNumber()
  @IsOptional()
  created_at?: number | null;

  @IsNumber()
  @IsOptional()
  confirmed_at?: number | null;

  @IsString()
  @IsOptional()
  origin?: string | null;

  @IsNumber()
  @IsOptional()
  naoperturbe?: number | null;
}
