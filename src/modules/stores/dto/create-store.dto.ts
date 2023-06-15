import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreDto {
  @ApiProperty()
  @IsNotEmpty()
  shopify_store_id: number;

  @ApiProperty()
  @IsNotEmpty()
  store_name: string;

  @ApiProperty()
  @IsNotEmpty()
  store_domain: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  store_access_token: string;
}
