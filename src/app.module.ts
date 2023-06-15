import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoresModule } from './modules/stores/stores.module';
import { AdsModule } from './modules/ads/ads.module';
import { ProductsModule } from './modules/products/products.module';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { PurchasesModule } from './modules/purchases/purchases.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    StoresModule,
    ProductsModule,
    AdsModule,
    PurchasesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // ScheduledTasksService,
  ],
})
export class AppModule {}
