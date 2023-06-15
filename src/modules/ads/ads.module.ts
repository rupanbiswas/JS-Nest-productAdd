import { Module } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { Ads } from './entities/ads.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdsRepository } from './ads.repository';
import { StoresModule } from '../stores/stores.module';
import { StoreRepository } from '../stores/store.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Ads]), StoresModule],
  controllers: [AdsController],
  providers: [AdsService, AdsRepository, StoreRepository],
  exports: [AdsService, AdsRepository],
})
export class AdsModule {}
