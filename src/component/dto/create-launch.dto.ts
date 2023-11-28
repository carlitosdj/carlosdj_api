import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLaunchDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsOptional()
  @IsString()
  slug?: string | null;

  @IsOptional()
  @IsString()
  eventName?: string | null;

  @IsOptional()
  @IsString()
  eventHeadline?: string | null;

  @IsOptional()
  @IsString()
  eventDescription?: string | null;

  @IsOptional()
  @IsString()
  expertName?: string | null;

  @IsOptional()
  @IsString()
  cartOpenDate?: string | null;

  @IsOptional()
  @IsString()
  cartCloseDate?: string | null;

  @IsOptional()
  @IsString()
  leadSignUpStartDate?: string | null;

  @IsOptional()
  @IsString()
  leadSignUpEndDate?: string | null;

  @IsOptional()
  @IsString()
  dateCpl1?: string | null;

  @IsOptional()
  @IsString()
  dateCpl2?: string | null;

  @IsOptional()
  @IsString()
  dateCpl3?: string | null;

  @IsOptional()
  @IsString()
  productName?: string | null;

  @IsOptional()
  @IsString()
  productHeadline?: string | null;
  
  @IsOptional()
  @IsString()
  productDescription?: string | null;

  @IsOptional()
  @IsString()
  productPrice?: string | null;

  @IsOptional()
  @IsString()
  productInstallments?: string | null;

  @IsOptional()
  @IsString()
  productVideo?: string | null;

  @IsOptional()
  @IsString()
  productDiscount?: string | null;

  @IsOptional()
  @IsString()
  productDiscountText?: string | null;

  @IsOptional()
  @IsString()
  productWaitLink?: string | null;

  @IsOptional()
  @IsString()
  talktousLink?: string | null;

  @IsOptional()
  @IsNumber()
  componentId?: number | null;
}
