import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePurchaseDto {
  @ApiProperty()
  @IsNotEmpty()
  subscription_name: string;

  @ApiProperty()
  @IsNotEmpty()
  shopify_store_id: number;

  @ApiProperty()
  @IsNotEmpty()
  shopify_charge_id: number;

  @ApiProperty()
  @IsNotEmpty()
  shopify_charge_status: string;

  @ApiProperty()
  @IsNotEmpty()
  shopify_charge_url: string;

  @ApiProperty()
  @IsNotEmpty()
  shopify_charge_response: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  number_of_products: number;

  @ApiProperty()
  @IsNotEmpty()
  days: number;
}
