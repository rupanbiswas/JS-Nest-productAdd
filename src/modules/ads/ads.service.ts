import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Stores } from '../stores/entities/stores.entity';
import { StoreRepository } from '../stores/store.repository';
import { AdsRepository } from './ads.repository';
import { Ads } from './entities/ads.entity';

@Injectable()
export class AdsService {
  constructor(
    private readonly adRepository: AdsRepository,
    private readonly StoreRepository: StoreRepository,
  ) {}

  async getAllAds(shopify_product_id: number): Promise<Ads[]> {
    const found: Ads[] = await this.adRepository.find({
      where: { shopify_product_id: shopify_product_id, is_saved: false, is_disliked: false },
    });
    if (!found) {
      throw new NotFoundException(`Unable to get ads`);
    }
    return found;
  }

  async getAllSavedAds(shopify_product_id: number): Promise<Ads[]> {
    const found: Ads[] = await this.adRepository.find({
      where: { shopify_product_id: shopify_product_id, is_saved: true, is_disliked: false },
    });
    if (!found) {
      throw new NotFoundException(`Unable to get ads`);
    }
    return found;
  }

  async postSavedAd(ad_id: number): Promise<boolean> {
    try {
      const ad: Ads = await this.adRepository.findOne({
        where: { id: ad_id },
        relations: { store: true },
      });
      const store: Stores = await this.StoreRepository.findOne({
        where: { shopify_store_id: ad.store.shopify_store_id },
      });

      if (!ad || !store) {
        throw new NotFoundException('Ad or store not found');
      }
      if (!ad.is_saved) {
        ad.is_saved = true;
        store.total_saved_ads = store.total_saved_ads + 1;
      } else {
        ad.is_saved = false;
        store.total_saved_ads = store.total_saved_ads - 1;
      }
      this.adRepository.save(ad);
      this.StoreRepository.save(store);
      return true;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(ad_id);
    }
  }

  async postDislikedAd(ad_id: number): Promise<boolean> {
    try {
      const ad: Ads = await this.adRepository.findOne({
        where: { id: ad_id },
        relations: { store: true },
      });
      const store: Stores = await this.StoreRepository.findOne({
        where: { shopify_store_id: ad.store.shopify_store_id },
      });

      if (!ad) {
        throw new NotFoundException('Ad not found');
      }
      if (!ad.is_disliked) {
        ad.is_disliked = true;
        store.total_disliked_ads = store.total_disliked_ads + 1;
        this.adRepository.save(ad);
        this.StoreRepository.save(store);
      }
      return true;
    } catch (error) {
      throw new BadRequestException(ad_id);
    }
  }
}
