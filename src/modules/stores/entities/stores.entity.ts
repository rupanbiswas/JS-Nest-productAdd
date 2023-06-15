import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import {SubscribedProducts} from '../../products/entities/subscribed_products.entity';
import {Ads} from '../../ads/entities/ads.entity';
import {StoreHasPurchases} from '../../purchases/entities/store_has_purchases.entity';

@Entity()
export class Stores {
    @PrimaryColumn({type: 'bigint'})
    shopify_store_id: number;

    @Column()
    store_name: string;

    @Column()
    store_domain: string;

    @Column()
    email: string;

    @Column()
    store_access_token: string;

    @Column('int', {default: 0})
    total_allowed_products: number;

    @Column('int', {default: 0})
    total_subscribed_products: number;

    @Column('int', {default: 0})
    total_saved_ads: number;

    @Column('int', {default: 0})
    total_disliked_ads: number;

    @Column({nullable: true})
    subscription_start_date: string;

    @Column({nullable: true})
    subscription_end_date: string;

    @OneToMany(
        (type) => StoreHasPurchases,
        (planPurchases) => planPurchases.store,
    )
    store_has_purchases: StoreHasPurchases[];

    @OneToMany((type) => Ads, (ads) => ads.store)
    ads: Ads[];

    @OneToMany(
        (type) => SubscribedProducts,
        (subscribedProduct) => subscribedProduct.store,
    )
    subscribed_products: SubscribedProducts[];

    @CreateDateColumn({nullable: false})
    created_at: Date;

    @UpdateDateColumn({nullable: false})
    updated_at: Date;
}
