import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Stores Management')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @ApiOperation({
    summary: 'C Create Store',
    description: 'This api helps us to create entry about the store',
  })
  @Post()
  async create(@Body() createStoreDto: CreateStoreDto): Promise<{
    code: number;
    data: { store: CreateStoreDto };
    success: boolean;
    message: string;
  }> {
    try {
      const store = await this.storesService.create(createStoreDto);
      return {
        success: true,
        code: 200,
        message: 'Store has been created.',
        data: {
          store: store,
        },
      };
    } catch (e) {
      return {
        data: { store: e },
        success: false,
        code: 201,
        message: 'Something went wrong. Please contact support team.',
      };
    }
  }

  @ApiOperation({
    summary: 'R Retrieve Store By ID',
    description: 'This api helps us get any store data by its id',
  })
  @Get(':shopify_store_id')
  async findOne(@Param('shopify_store_id') shopify_store_id: number): Promise<{
    code: number;
    data: { store: any };
    success: boolean;
    message: string;
  }> {
    try {
      const store = await this.storesService.findOne(shopify_store_id);
      return {
        success: true,
        code: 200,
        message: 'Store has been retrieved.',
        data: {
          store: store,
        },
      };
    } catch (error) {
      return {
        data: { store: error },
        success: false,
        code: 201,
        message: `Store with id ${shopify_store_id} does not exist.`,
      };
    }
  }
}
