import {Stores} from '../../stores/entities/stores.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SubscribedProducts {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => Stores, (store) => store.subscribed_products)
    @JoinColumn({name: 'shopify_store_id'})
    store: Stores;

    @Column({type: 'bigint'})
    shopify_product_id: number;

    @Column()
    title: string;

    @Column({type: 'longtext'})
    description: string;

    @Column({default: 0})
    price: number;

    @Column({nullable: true})
    image: string;

    @Column()
    type: string;

    @CreateDateColumn({nullable: false})
    created_at: Date;

    @UpdateDateColumn({nullable: false})
    updated_at: Date;
}
