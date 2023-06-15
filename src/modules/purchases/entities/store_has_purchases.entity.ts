import { Stores } from '../../stores/entities/stores.entity';
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
export class StoreHasPurchases {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Stores, (store) => store.store_has_purchases)
  @JoinColumn({ name: 'shopify_store_id' })
  store: Stores;

  @Column()
  number_of_products: number;

  @Column({type: 'double'})
  price: number;

  @Column()
  subscription_name: string;

  @Column({ type: 'bigint' })
  shopify_charge_id: number;

  @Column()
  shopify_charge_url: string;

  @Column({ default: 'pending' })
  shopify_charge_status: string; // default = pending

  @Column({ type: 'json' })
  shopify_charge_response: string;

  @Column({ nullable: false })
  days: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
