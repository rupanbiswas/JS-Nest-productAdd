import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from "class-validator";

export class UpdatePurchaseDto {
    @ApiProperty()
    @IsNotEmpty()
    shopify_charge_id: number;

    @ApiProperty()
    @IsNotEmpty()
    shopify_charge_status: string;
}
