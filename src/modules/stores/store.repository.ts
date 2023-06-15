import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Stores } from './entities/stores.entity';

@Injectable()
export class StoreRepository extends Repository<Stores> {
  constructor(private dataSource: DataSource) {
    super(Stores, dataSource.createEntityManager());
  }
}
