import {Injectable} from '@nestjs/common';
import {CreateStoreDto} from './dto/create-store.dto';
import {Stores} from './entities/stores.entity';
import {StoreRepository} from './store.repository';

@Injectable()
export class StoresService {
    constructor(private storeRepository: StoreRepository) {
    }

    async checkForStore(createStoreDto: CreateStoreDto): Promise<Stores[]> {
        return await this.storeRepository.find({
            where: {
                shopify_store_id: createStoreDto.shopify_store_id
            },
            relations: {store_has_purchases: true},
        });
    }

    async create(createStoreDto: CreateStoreDto): Promise<Stores> {
        let checkForStore = await this.checkForStore(createStoreDto);
        if (checkForStore.length > 0) {
            return checkForStore[0];
        } else {
            const store: Stores = this.storeRepository.create(createStoreDto);
            await this.storeRepository.save(store);
            let checkForStore = await this.checkForStore(createStoreDto);
            return checkForStore[0];
        }
    }

    async findOne(shopify_store_id: number): Promise<Stores> {
        return await this.storeRepository.findOneOrFail({
            where: {
                shopify_store_id,
            },
            relations: {store_has_purchases: true},
        });
    }
}
