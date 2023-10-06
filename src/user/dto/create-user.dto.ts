import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  newPassword?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password_hash?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  auth_key?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  confirmed_at?: number | null;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  blocked_at?: number | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  registration_ip?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  created_at?: number | null;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  updated_at?: number | null;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  flag?: number | null;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  last_login_at?: number | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  origin?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  num_turma?: number | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bio?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  whatsapp?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cpf?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  postalCode?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  addressNumber?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  addressDistrict?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image?: string | null;

  @ApiProperty()
  @Min(1)
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  city_id?: number | null;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  state_id?: number | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  roles?: string | null;
}
