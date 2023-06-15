import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SubscribedProducts } from './entities/subscribed_products.entity';

@Injectable()
export class ProductsRepository extends Repository<SubscribedProducts> {
  constructor(private dataSource: DataSource) {
    super(SubscribedProducts, dataSource.createEntityManager());
  }
}
