import {Controller, Post, Body, Param, Get, Patch, Query} from '@nestjs/common';
import {PurchasesService} from './purchases.service';
import {CreatePurchaseDto} from './dto/create-purchase.dto';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {StoreHasPurchases} from './entities/store_has_purchases.entity';
import {UpdatePurchaseDto} from "./dto/update-purchase.dto";

@ApiTags('Plan purchases')
@Controller('purchases')
export class PurchasesController {
    constructor(private readonly purchasesService: PurchasesService) {
    }

    @ApiOperation({
        summary: 'C Create Store purchases pre-payment',
        description:
            'This api helps us to create entry about the store purchase pre payment',
    })
    @Post()
    async create(@Body() createPurchaseDto: CreatePurchaseDto): Promise<{
        code: number;
        data: { purchase: any };
        success: boolean;
        message: string;
    }> {
        try {
            const purchase: StoreHasPurchases = await this.purchasesService.create(
                createPurchaseDto,
            );
            return {
                success: true,
                code: 200,
                message: 'Subscription has been purchased..',
                data: {
                    purchase: purchase,
                },
            };
        } catch (error) {
            return {
                data: {purchase: error},
                success: false,
                code: 201,
                message: `Something went wrong. Please contact support team. `,
            };
        }
    }

    @ApiOperation({
        summary: 'U Update Store purchases post-payment',
        description: 'This api helps us to update entry about the store purchase post payment',
    })
    @Patch()
    async update(@Body() updatePurchaseDto: UpdatePurchaseDto): Promise<{
        code: number;
        data: { purchase: any };
        success: boolean;
        message: string;
    }> {
        try {
            const purchase: StoreHasPurchases = await this.purchasesService.update(updatePurchaseDto);
            return {
                success: true,
                code: 200,
                message: 'Status of your subscription has been updated.',
                data: {
                    purchase: purchase,
                },
            };
        } catch (error) {
            return {
                data: {purchase: error},
                success: false,
                code: 201,
                message: `Something went wrong. Please contact support team. `,
            };
        }
    }

    @ApiOperation({
        summary: 'R Retrieve Store purchases ID',
        description: 'This api helps us get any store purchases data by its id',
    })
    @Get(':shopify_store_id')
    async findOne(@Param('shopify_store_id') shopify_store_id: number): Promise<{
        code: number;
        data: { purchases: any };
        success: boolean;
        message: string;
    }> {
        try {
            const purchases: StoreHasPurchases[] = await this.purchasesService.find(shopify_store_id,);

            return {
                success: true,
                code: 200,
                message: 'Purchased subscriptions have been retrieved.',
                data: {
                  purchases: purchases,
                },
            };
        } catch (error) {
            return {
                data: {purchases: error},
                success: false,
                code: 201,
                message: `Store purchase with id ${shopify_store_id} does not exist.`,
            };
        }
    }
}
