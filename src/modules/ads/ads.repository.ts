import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Ads } from './entities/ads.entity';

@Injectable()
export class AdsRepository extends Repository<Ads> {
  constructor(private dataSource: DataSource) {
    super(Ads, dataSource.createEntityManager());
  }
}
