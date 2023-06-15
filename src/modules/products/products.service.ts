import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsRepository } from './products.repository';
import { StoreRepository } from '../stores/store.repository';
import * as uuid from 'uuid';
import * as AWS from 'aws-sdk';
import { MoreThan, MoreThanOrEqual } from 'typeorm';
import { AdsRepository } from '../ads/ads.repository';
import { Stores } from '../stores/entities/stores.entity';
import { SubscribedProducts } from './entities/subscribed_products.entity';

@Injectable()
export class ProductsService {
  sqs: any;

  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly storeRepository: StoreRepository,
    private readonly adsRepository: AdsRepository,
  ) {
    AWS.config.update({
      region: process.env.AWS_region,
      accessKeyId: process.env.AWS_accessKeyId,
      secretAccessKey: process.env.AWS_secretAccessKey,
    });

    this.sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
  }

  async create(createProductDto: CreateProductDto) {
    const countSubscribedProducts = await this.productsRepository.count({
      where: {
        store: { shopify_store_id: createProductDto.shopify_store_id },
      },
    });
    if (countSubscribedProducts >= 5) {
      throw new BadRequestException(
        'Exceeded maximum limit to subscribe product',
      );
    }

    const checkForProduct = await this.productsRepository.find({
      where: {
        shopify_product_id: createProductDto.shopify_product_id,
      },
    });

    const findStore = await this.storeRepository.findOne({
      where: {
        shopify_store_id: createProductDto.shopify_store_id,
      },
    });

    if (checkForProduct.length > 0) {
      return checkForProduct[0];
    } else {
      const product = this.productsRepository.create({
        store: findStore,
        shopify_product_id: createProductDto.shopify_product_id,
        title: createProductDto.title,
        description: createProductDto.description,
        image: createProductDto.image,
        type: createProductDto.type,
        price: createProductDto.price,
      });

      await this.productsRepository.save(product);

      findStore.total_subscribed_products =
        findStore.total_subscribed_products + 1;
      this.storeRepository.save(findStore);

      let params_AWS_SQS = {
        //DelaySeconds: 10,
        MessageAttributes: {
          ProductId: {
            DataType: 'String',
            StringValue: createProductDto.shopify_product_id.toString(),
          },
          Title: {
            DataType: 'String',
            StringValue: createProductDto.title,
          },
          Description: {
            DataType: 'String',
            StringValue: createProductDto.description,
          },
          ShopOwnerEmail: {
            DataType: 'String',
            StringValue: findStore.email,
          },
          StoreId: {
            DataType: 'String',
            StringValue: createProductDto.shopify_store_id.toString(),
          },
          Url: {
            DataType: 'String',
            StringValue: findStore.store_domain,
          },
          Price: {
            DataType: 'String',
            StringValue: createProductDto.price.toString(),
          },
        },
        MessageBody:
          'Information about the product - ' + createProductDto.title,
        MessageDeduplicationId: uuid.v4(), //randomly generated-id // Required for FIFO queues
        MessageGroupId: 'Group1', // Required for FIFO queues
        QueueUrl: process.env.AWS_queueURL,
      };

      //--Send/Pass the default product-info to the aws-sqs queue
      this.sqs.sendMessage(params_AWS_SQS, async function (errSQS, dataSQS) {
        if (errSQS) {
          console.log('Error', errSQS);
          throw new BadRequestException(errSQS);
        } else {
          console.log('SQS Worked');
        }
      });

      return product;
    }
  }

  async find(store_id: number) {
    const products: any = await this.productsRepository.find({
      where: { store: { shopify_store_id: store_id } },
    });
    for (let productIndex in products) {
      let total_saved_ads = await this.adsRepository.count({
        where: {
          shopify_product_id: products[productIndex].shopify_product_id,
          is_saved: true,
        },
      });
      let total_generated_ads = await this.adsRepository.count({
        where: {
          shopify_product_id: products[productIndex].shopify_product_id,
        },
      });
      products[productIndex].total_saved_ads = total_saved_ads;
      products[productIndex].total_generated_ads = total_generated_ads;
    }

    return products;
  }
}
