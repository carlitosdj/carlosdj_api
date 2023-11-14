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
  passwordHash?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  authKey?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  confirmedAt?: Date | null;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  blockedAt?: Date | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  registrationIp?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  createdAt?: Date | null;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  updatedAt?: Date | null;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  flag?: number | null;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  lastLoginAt?: Date | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  origin?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  numTurma?: number | null;

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
  cityId?: number | null;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  stateId?: number | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  roles?: string | null;
}
