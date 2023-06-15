import {Module} from '@nestjs/common';
import {ProductsService} from './products.service';
import {ProductsController} from './products.controller';
import {ProductsRepository} from './products.repository';
import {SubscribedProducts} from './entities/subscribed_products.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {StoreRepository} from '../stores/store.repository';
import {AdsModule} from '../ads/ads.module';
import {AdsRepository} from '../ads/ads.repository';

@Module({
    imports: [TypeOrmModule.forFeature([SubscribedProducts]), AdsModule],
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository, StoreRepository, AdsRepository],
    exports: [ProductsRepository],
})
export class ProductsModule {
}
