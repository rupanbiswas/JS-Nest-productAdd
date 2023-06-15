import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ProductsService} from './products.service';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {CreateProductDto} from './dto/create-product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {
    }

    @ApiOperation({
        summary: 'C Create subscribed product',
        description: 'This api help us to create entry for subscribed product and send its info to sqs',
    })
    @Post()
    async create(
        @Body() createProductDto: CreateProductDto,
    ): Promise<{ code: number; data: { product: any }; success: boolean; message: string }> {
        try {
            const product = await this.productsService.create(createProductDto,);

            return {
                success: true,
                code: 200,
                message: 'Product has been created.',
                data: {
                    product: product,
                },
            };
        } catch (error) {
            return {
                data: {product: error},
                success: false,
                code: 201,
                message: `Something went wrong. Please contact support team. `,
            };
        }
    }

    @ApiOperation({
        summary: 'G Get subscribed product by store_id',
        description: 'This api helps us get any subscribed products of a store by its store_id',
    })
    @Get(':shopify_store_id')
    async findOne(@Param('shopify_store_id') shopify_store_id: number): Promise<{
        code: number;
        data: { products: any };
        success: boolean;
        message: string;
    }> {
        try {
            const products = await this.productsService.find(shopify_store_id);
            return {
                success: true,
                code: 200,
                message: 'Products have been retrieved.',
                data: {
                    products: products,
                },
            };
        } catch (error) {
            return {
                data: {products: error},
                success: false,
                code: 201,
                message: `Something went wrong with store id #${shopify_store_id}.`,
            };
        }
    }
}
