import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreHasPurchases } from './entities/store_has_purchases.entity';
import { StoreHasPurchasesRepository } from './storeHasPurchases.repository';
import { StoresModule } from '../stores/stores.module';

@Module({
  imports: [TypeOrmModule.forFeature([StoreHasPurchases]), StoresModule],
  controllers: [PurchasesController],
  providers: [PurchasesService, StoreHasPurchasesRepository],
})
export class PurchasesModule {}
