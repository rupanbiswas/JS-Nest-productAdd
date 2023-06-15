import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { StoreHasPurchases } from './entities/store_has_purchases.entity';

@Injectable()
export class StoreHasPurchasesRepository extends Repository<StoreHasPurchases> {
  constructor(private dataSource: DataSource) {
    super(StoreHasPurchases, dataSource.createEntityManager());
  }
}
