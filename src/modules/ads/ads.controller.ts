import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AdsService } from './ads.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Ads } from './entities/ads.entity';

@ApiTags('Ads Management')
@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Get()
  @ApiOperation({
    summary: 'L Listing ads',
    description:
      'This api help us to list ads generated for any particular product',
  })
  async getAllAds(
    @Query('shopify_product_id') shopify_product_id: string,
  ): Promise<{
    code: number;
    data: { ads: any };
    success: boolean;
    message: string;
  }> {
    try {
      const ads = await this.adsService.getAllAds(Number(shopify_product_id));
      return {
        success: true,
        code: 200,
        message: 'Ads has been retrieved.',
        data: {
          ads: ads,
        },
      };
    } catch (error) {
      return {
        data: { ads: error },
        success: false,
        code: 201,
        message: `Ads with product id ${shopify_product_id} does not exist.`,
      };
    }
  }

  @Get('/save')
  @ApiOperation({
    summary: 'L Listing',
    description:
      'This api helps us to list ads for any particular product which are saved by the user',
  })
  async getAllSavedAds(
    @Query('shopify_product_id') shopify_product_id: string,
  ): Promise<{
    code: number;
    data: { ads: any };
    success: boolean;
    message: string;
  }> {
    try {
      const ads = await this.adsService.getAllSavedAds(
        Number(shopify_product_id),
      );
      return {
        success: true,
        code: 200,
        message: 'Store has been retrieved.',
        data: {
          ads: ads,
        },
      };
    } catch (error) {
      return {
        data: { ads: error },
        success: false,
        code: 201,
        message: `Ads with product id ${shopify_product_id} does not exist.`,
      };
    }
  }

  @Post('/save')
  @ApiOperation({
    summary: 'U Update saved status',
    description: 'This api helps us to update an ads is_saved option to true',
  })
  async postSavedAd(@Query('ad_id') ad_id: string): Promise<{
    code: number;
    data: { savedAd: any };
    success: boolean;
    message: string;
  }> {
    try {
      const savedAd = await this.adsService.postSavedAd(Number(ad_id));
      return {
        success: true,
        code: 200,
        message: 'Ad has been saved.',
        data: {
          savedAd: savedAd,
        },
      };
    } catch (error) {
      return {
        data: { savedAd: error },
        success: false,
        code: 201,
        message: `Ad with id ${ad_id} does not exist.`,
      };
    }
  }

  @Post('/dislike')
  @ApiOperation({
    summary: 'U Update dislike status',
    description:
      'This api helps us to update an ads is_disliked option to true',
  })
  async postDislikeAd(@Query('ad_id') ad_id: string): Promise<{
    code: number;
    data: { dislikedAd: any };
    success: boolean;
    message: string;
  }> {
    try {
      const dislikedAd = await this.adsService.postDislikedAd(Number(ad_id));
      return {
        success: true,
        code: 200,
        message: 'Store has been retrieved.',
        data: {
          dislikedAd: dislikedAd,
        },
      };
    } catch (error) {
      return {
        data: { dislikedAd: error },
        success: false,
        code: 201,
        message: `Ad with id ${ad_id} does not exist.`,
      };
    }
  }
}
