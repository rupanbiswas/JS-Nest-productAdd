import {Injectable, NotFoundException} from '@nestjs/common';
import {Stores} from '../stores/entities/stores.entity';
import {StoreRepository} from '../stores/store.repository';
import {CreatePurchaseDto} from './dto/create-purchase.dto';
import {StoreHasPurchases} from './entities/store_has_purchases.entity';
import {StoreHasPurchasesRepository} from './storeHasPurchases.repository';
import {Not} from "typeorm";
import {UpdatePurchaseDto} from "./dto/update-purchase.dto";

@Injectable()
export class PurchasesService {
    constructor(
        private readonly storeHasPurchasesRepository: StoreHasPurchasesRepository,
        private readonly storeRepository: StoreRepository,
    ) {
    }

    async create(
        createPurchaseDto: CreatePurchaseDto,
    ): Promise<StoreHasPurchases> {
        const checkForStore: Stores[] = await this.storeRepository.find({
            where: {
                shopify_store_id: createPurchaseDto.shopify_store_id,
            },
        });

        if (checkForStore.length > 0) {
            const purchase: StoreHasPurchases =
                this.storeHasPurchasesRepository.create({
                    store: checkForStore[0],
                    number_of_products: createPurchaseDto.number_of_products,
                    price: createPurchaseDto.price,
                    subscription_name: createPurchaseDto.subscription_name,
                    shopify_charge_id: createPurchaseDto.shopify_charge_id,
                    shopify_charge_url: createPurchaseDto.shopify_charge_url,
                    shopify_charge_response: createPurchaseDto.shopify_charge_response,
                    days: createPurchaseDto.days,
                });

            const store: Stores = await this.storeRepository.findOne({
                where: {shopify_store_id: createPurchaseDto.shopify_store_id},
            });

            store.subscription_start_date = new Date().toLocaleString('en-GB').toString();
            const date = new Date();
            date.setDate(date.getDate() + createPurchaseDto.days);
            store.subscription_end_date = date.toLocaleString('en-GB').toString();

            await this.storeHasPurchasesRepository.save(purchase);
            await this.storeRepository.save(store);

            return purchase;
        } else {
            throw new NotFoundException();
        }
    }

    async update(updatePurchaseDto: UpdatePurchaseDto): Promise<StoreHasPurchases> {
        try {
            const purchase: StoreHasPurchases =
                await this.storeHasPurchasesRepository.findOneOrFail({
                    where: {shopify_charge_id: updatePurchaseDto.shopify_charge_id},
                    relations: {
                        store: true,
                    },
                });

            if (purchase) {
                purchase.shopify_charge_status = updatePurchaseDto.shopify_charge_status;
                await this.storeHasPurchasesRepository.save(purchase);
            } else {
                throw new NotFoundException();
            }

            return purchase;
        } catch (error) {
            throw new Error(error);
        }
    }

    async find(shopify_store_id: number): Promise<StoreHasPurchases[]> {
        return await this.storeHasPurchasesRepository.find({
            select: ['number_of_products', 'price', 'subscription_name', 'shopify_charge_status', 'days', 'created_at'],
            where: {
                store: {shopify_store_id: shopify_store_id},
                shopify_charge_status: Not('pending'),
            },
        });
    }
}
