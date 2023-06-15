import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class CreateProductDto {
    @ApiProperty()
    @IsNotEmpty()
    shopify_store_id: number;

    @ApiProperty()
    @IsNotEmpty()
    shopify_product_id: number;

    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    image: string;

    @ApiProperty()
    @IsNotEmpty()
    type: string;
}
